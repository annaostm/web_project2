import React, { useState, useContext } from "react";
import "./input.css";
import Commit from "../commit/commit";
import Branch from "../branch/branch";
import Issue from "../issue/issue";
import MR from "../mr/mr";
import LoginForm from "../loginform";
import { useLocalStorage, useSessionStorage } from "../../helpers/hooks";
import { getCommits } from "../../api/getCommits";
import { getIssues } from "../../api/getIssues";
import { getMergeRequests } from "../../api/getMergeRequests";
import { getBranches } from "../../api/getBranches";
import CustomButton from "../button/button";
import { getHP } from "../../api/getHP";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { ThemeContext } from "../../darkmode/ThemeProvider";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Members from "../members";
import { getMembers } from "../../api/getMembers";
import CommitMembers from "../commit/commitMembers";
import BranchMembers from "../branch/branchMembers";

const Input = () => {
  //Setting constants
  //Project ID and Personal Access Token with storage
  const [SSID, setSSID] = useLocalStorage<string>("SSID", "");
  const [SSPAT, setSSPAT] = useSessionStorage<string>("SSPAT", "");
  const accessToken = `Bearer ` + SSPAT;
  //The data types
  const [commitData, setCommitData] = useState<Commit[]>([]);
  const [issuesData, setIssuesData] = useState<Issue[]>([]);
  const [branchesData, setBranchesData] = useState<Branch[]>([]);
  const [mrData, setMRData] = useState<MR[]>([]);
  const [memberData, setMemberData] = useState<Members[]>([]);
  const [homeDataName, setHomeData] = useState<string>("");
  //Showing different buttons for different cases
  const [showCategoryButtons, setShowCategoryButtons] = useState<string>("none");
  const [showDateIssueFilter, setShowDateIssueFilter] = useState<boolean>(false);
  const [showCommitFilterButtons, setShowCommitFilterButtons] =
    useState<boolean>(false);
  const [showDateFilterMR, setShowDateFilterMR] = useState<boolean>(false);
  const [showBranchFilterButtons, setShowBranchFilterButtons] =
    useState<boolean>(false);
  //Error handling
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  //Formatting/styling
  const [formStyle, setFormStyle] = useState<string>("hidden-form");
  //Values for different filters
  const [filterValueState, setFilterValueState] = useState<string>("closed");
  const [datefrom, setDatefrom] = useState<string>("");
  const [dateto, setDateto] = useState<string>("");
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [fromValue, setFromValue] = React.useState<Dayjs | null>(
    dayjs('2022-09-01T21:11:54'),
  );
  const [toValue, setToValue] = React.useState<Dayjs | null>(
    dayjs('2022-10-05T21:11:54'),
  );
  //Values for Darkmode
  const {dark} = useContext(ThemeContext);


  //Handling setting the filters based on the users choice
  const handleDateFilter = () => {
    const asString = dayjs(fromValue).format('YYYY-MM-DD');
    const toAsString = dayjs(toValue).format('YYYY-MM-DD');
    setDatefrom(asString)
    setDateto(toAsString)
    if (showDateIssueFilter === true) {
      handleClickIssues()
    }
    if (showCommitFilterButtons === true) {
      handleClickCommit()
    }
    if (showDateFilterMR === true) {
      handleClickMR()
    }
    if (showBranchFilterButtons === true) {
      handleClickBranches()
    }

  };
  const handleDateReset = () => {
    setDatefrom("")
    setDateto("")
    if (showDateIssueFilter === true) {
      handleClickIssues()
    }
    if (showCommitFilterButtons === true) {
      handleClickCommit()
    }
    if (showDateFilterMR === true) {
      handleClickMR()
    }
    if (showBranchFilterButtons === true) {
      handleClickBranches()
    }
  };

  const handleStateFilter = (e:any) => {
    setAuthorFilter(e.currentTarget.value)
    if (showBranchFilterButtons === true) {
      handleClickBranches()
    }
    if (showCommitFilterButtons === true) {
      handleClickCommit()
    }
  };
  const handleResetStateFilter = () => {
    setAuthorFilter("")
    if (showBranchFilterButtons === true) {
      handleClickBranches()
    }
    if (showCommitFilterButtons === true) {
      handleClickCommit()
    }
  };

  const handleChangeFrom = (newValue: Dayjs | null) => {
    setFromValue(newValue);
  };
  const handleChangeTo = (newValue: Dayjs | null) => {
    setToValue(newValue);
  };

  const handleChangeM = (e: any) => {
    if (e.target.checked) {
      setFilterValueState(e.target.value)
    }
    else {
      setFilterValueState("")
    }
  };

  //Handling getting the components and finding repository-data when clicked on by the user
  const handleClickSearch = () => {
    setSSID(SSID);
    setSSPAT(SSPAT);
    setHomeData("");
    //Error handling if one or both input fields are empty
    if (SSID.length === 0 || SSPAT.length === 0) {
      setErrorMessage("Error! Please write both Project ID and Access Token");
      setShowCategoryButtons("none");
      setError(true);
      return;
    } else {
      setError(false);
    }
    setCommitData([]);
    setBranchesData([]);
    setMRData([]);
    setIssuesData([]);
    getHP(accessToken, SSID)
      .then((response) => {
        if (response.ok) return response.json();
        //Error handling if project-id and access token does not match or exist
        setError(true);
        setErrorMessage(
          "Error! Did you type in the correct Project ID and token?"
        );
        setShowCategoryButtons("none");
      })
      .then((homeData) => {
        if (homeData === undefined) return;
        setHomeData(homeData.name);
        setShowCategoryButtons("inline");
      });
    handleMembers();
    setShowDateFilterMR(false);
    setShowCommitFilterButtons(false);
    setShowDateIssueFilter(false);
    setShowBranchFilterButtons(false);
  };

  //Handling fetching and displaying data regarding Issues when clicked on by the user
  const handleClickIssues = () => {
    setFormStyle("form");
    setIssuesData([]);
    setCommitData([]);
    setBranchesData([]);
    setMRData([]);
    getIssues(accessToken, SSID)
      .then((response) => {
        if (response.ok) return response.json();
        setError(true);
        setShowCategoryButtons("none");
      })
      .then((issuesData) => {
        if (issuesData === undefined) return;
        setIssuesData(issuesData);
        setShowCategoryButtons("inline");
      });
    setShowDateFilterMR(false);
    setShowCommitFilterButtons(false);
    setShowDateIssueFilter(true);
    setShowBranchFilterButtons(false);
  };

  //Handling fetching and displaying data regarding Merge requests when clicked on by the user
  const handleClickMR = () => {
    setFormStyle("form");
    setIssuesData([]);
    setCommitData([]);
    setBranchesData([]);
    setMRData([]);
    getMergeRequests(accessToken, SSID)
      .then((response) => {
        if (response.ok) return response.json();

        setError(true);
      })
      .then((mrData) => {
        if (mrData === undefined) return;
        setMRData(mrData);
      });
    setShowCommitFilterButtons(false);
    setShowDateFilterMR(true);
    setShowDateIssueFilter(false);
    setShowBranchFilterButtons(false);
  };

  //Handling fetching and displaying data regarding Branches when clicked on by the user
  const handleClickBranches = () => {
    setFormStyle("form");
    setIssuesData([]);
    setCommitData([]);
    setBranchesData([]);
    setMRData([]);
    getBranches(accessToken, SSID)
      .then((response) => {
        if (response.ok) return response.json();

        setError(true);
      })
      .then((branchesData) => {
        if (branchesData === undefined) return;
        setBranchesData(branchesData);
      });
    setShowDateFilterMR(false);
    setShowCommitFilterButtons(false);
    setShowDateIssueFilter(false);
    setShowBranchFilterButtons(true);
  };

  //Handling fetching and displaying data regarding Commits when clicked on by the user
  const handleClickCommit = () => {
    setCommitData([]);
    setFormStyle("form");
    setBranchesData([]);
    setMRData([]);
    setCommitData([]);
    setIssuesData([]);
    getCommits(accessToken, SSID)
      .then((response) => {
        if (response.ok) return response.json();
        setError(true);
      })
      .then((commitData) => {
        if (commitData === undefined) return;
        setCommitData(commitData);
      });
    setShowDateFilterMR(false);
    setShowCommitFilterButtons(true);
    setShowDateIssueFilter(false);
    setShowBranchFilterButtons(false);
  };

  //Getting a list of the members in the project
  const handleMembers = () => {
    setFormStyle("form");
    setIssuesData([]);
    setBranchesData([]);
    setMRData([]);
    getMembers(accessToken, SSID)
      .then((response) => {
        if (response.ok) return response.json();
        setError(true);
      })
      .then((memberData) => {
        if (memberData === undefined) return;
        setMemberData(memberData);
      });
  };

  //Returning what will be displayed on the screen by the Input component
  return (
    //Changing colors based on if darkmode is selected or not
    <div className={dark ? "content-dark" : "content"}>
      <div className="login-form">
        {/* Input field for Project ID */}
        <LoginForm
          ssName="ID"
          ssValue={SSID}
          onChange={(e) => setSSID(e.currentTarget.value)}
        />
        {/* Input field for Access Token */}
        <LoginForm
          ssName="PAT"
          ssValue={SSPAT}
          onChange={(e) => setSSPAT(e.currentTarget.value)}
        />
        {/* Button for search for Repository */}
        <CustomButton
          display="inline"
          children="Search"
          onClick={() => handleClickSearch()}
        />
      </div>

      <br />
      <br />
      {/* Error handling */}
      <div className="title-of-repo">
        {error === false &&
          homeDataName.length > 0 ? (
          <div>
            <h1> Repository name: {homeDataName}</h1>
            <Members data={memberData} />
          </div>) : null}

        <div>{error === true ? <h2>{errorMessage}</h2> : null}</div>
      </div>
      <br />
      <br />
      <br />
      {/* Buttons for displaying Branches, Issues, Commits and Merge requests */}
      <div className="grid-buttons">
        <CustomButton
          display={showCategoryButtons}

          children="Branches"
          onClick={() => handleClickBranches()}
        />
        <CustomButton
          display={showCategoryButtons}
          children="Issues"
          onClick={() => handleClickIssues()}
        />
        <CustomButton
          display={showCategoryButtons}

          children="Commits"
          onClick={() => handleClickCommit()}
        />
        <CustomButton
          display={showCategoryButtons}

          children="Merge Requests"
          onClick={() => handleClickMR()}
        />
      </div>
      <br />
      <br />
      <br />
      {/* Filtering data based on date (TO and FROM) */}
      {(showCommitFilterButtons === true ||
        showDateFilterMR === true ||
        showDateIssueFilter === true ||
        showBranchFilterButtons === true) && error === false ? (
        <div className="date-grid">
          <div className="desktop-date-picker-from">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="From"
                inputFormat="YYYY-MM-DD"
                value={fromValue}
                onChange={handleChangeFrom}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="desktop-date-picker-to">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="To"
                inputFormat="YYYY-MM-DD"
                value={toValue}
                onChange={handleChangeTo}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

          </div>
          <CustomButton
            display="inline"
            children="Search on date"
            onClick={() => handleDateFilter()}
          />
          <CustomButton
            display="inline"
            children="Reset"
            onClick={() => handleDateReset()}
          />
        </div>
      ) : null}
      <br />
      <br />
      <br />
      {/* Filtering data based on member name */}
      {(showBranchFilterButtons === true) && error === false ? (
        <div >
          <p className="text">Click on a member to see the branches where they were the one to make the last commit:</p>
          <br/>
          <BranchMembers data={branchesData} onClick = {handleStateFilter}/>
        </div>
      ) : null}
      {(showCommitFilterButtons === true) && error === false ? (
        <div >
          <p className="text">Click on a member to see their commits:</p>
          <br/>
          <CommitMembers data={commitData} onClick = {handleStateFilter}/>
        </div>
      ) : null}
      {(showCommitFilterButtons || showBranchFilterButtons) && error === false ? (
      <div>
        <CustomButton 
            display="inline"
            children="Reset author filter"
            onClick={() => handleResetStateFilter()}
          />
      </div>):null}
      <br />
      <div>
        {/* Filtering data based on closed/open state */}
        {(showDateFilterMR === true || showDateIssueFilter === true) && error === false ? (
          <FormControl id= {dark? "radio-dark" : "radio-light"}>
            <FormLabel id={dark? "radio-dark" : "radio-light"}>
              Choose what to filter on:
            </FormLabel>
            <br/>
            <RadioGroup
              className="radio"
              aria-labelledby="demo-controlled-radio-buttons-group"
              defaultValue="closed"
            >
              {showDateFilterMR === true ? (
                <FormControlLabel
                  onChange={handleChangeM}
                  value="merged"
                  control={<Radio />}
                  label="Merged"
                />
              ) : null}
              <FormControlLabel
                onChange={handleChangeM}
                value="closed"
                control={<Radio />}
                label="Closed"
              />
              <FormControlLabel
                onChange={handleChangeM}
                value="opened"
                control={<Radio />}
                label="Open"
              />
            </RadioGroup>
          </FormControl>
        ) : null}
      </div>
      <br />
      <br />
      {/* Running components for displaying data with selected values */}
      <div className={formStyle}>
        {error === false ? (
          <div>
            {showCommitFilterButtons ?
              <Commit data={commitData} fromDateFilter={datefrom} toDateFilter={dateto} authorFilter={authorFilter} /> : null}
            {showBranchFilterButtons ?
              <Branch data={branchesData} fromDateFilter={datefrom} toDateFilter={dateto} authorFilter={authorFilter} /> : null}
            {showDateIssueFilter ?
              <Issue data={issuesData} fromDateFilter={datefrom} toDateFilter={dateto} authorFilter={filterValueState} /> : null}
            {showDateFilterMR ?
              <MR data={mrData} fromDateFilter={datefrom} toDateFilter={dateto} stateFilter={filterValueState} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Input;
