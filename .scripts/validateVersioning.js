#!/usr/bin/env node

/*
 * -----------------------------------------------------------------------------------------
 * ---------------------------------------- Imports ----------------------------------------
 * -----------------------------------------------------------------------------------------
 */

const process = require('process');
const fs = require('fs');
const { execSync } = require('child_process');

/*
 * -----------------------------------------------------------------------------------------
 * ----------------------------------- Constants & Data ------------------------------------
 * -----------------------------------------------------------------------------------------
 */

const headFileRows = [
  `#### **Task Link**: `,
  '',
  '- [ ] Jira status updated',
  '- [ ] Release notes for ticket written',
  '',
  '#### **Description**:',
  '',
  '#### **Updates**:',
];

const tableFileRows = [
  '| Component/File | Description |',
  '| -- | -- |',
];

const ticketFileRows = [
  '#### **Description**:',
  '',
  '| Pull | Ticket | Description |',
  '| -- | -- | -- |',
];

const tailFileRows = [
  '',
  '#### **Category**',
  '- ',
  '',
  '#### **Notes**:',
  '- ',
  '',
  '#### **Visuals**:',
  '[drag & drop here]',
];

/*
 * -----------------------------------------------------------------------------------------
 * ------------------------------------- Process Args --------------------------------------
 * -----------------------------------------------------------------------------------------
 */

const getArgs = (args) => {
  const passedArgs = args.slice(2);
  const [headBranch, baseBranch] = passedArgs;
  return { headBranch, baseBranch };
}

/*
 * -----------------------------------------------------------------------------------------
 * -------------------------------------- Misc Helpers -------------------------------------
 * -----------------------------------------------------------------------------------------
 */

const checkDirSafe = (path) => {
  try {
    fs.readdirSync(path);
    return true;
  } catch (error) {
    return false;
  }
};

const createOutDirIfNeeded = (outDirPath) => {
  const outDirExists = checkDirSafe(outDirPath);

  if (outDirExists) {
    return;
  } else {
    fs.mkdirSync(outDirPath);
    execSync(`echo ${outDirPath} >> .gitignore`)
  }
};

const getTaskLink = (branchName) => {
  // should account for things like CF-30b || CF-30_css, where matched text is only CF-30
  const jiraTicketMatch = branchName.match(/[A-Z]{2,10}-\d+/);
  let taskLinkString = '_No Ticket Found_'
  if (jiraTicketMatch !== null) {
    const [cleanBranchName] = jiraTicketMatch;
    taskLinkString = `[${cleanBranchName}]`
      + `(https://synapsefi.atlassian.net/browse/${cleanBranchName})`;
  };
  return taskLinkString;
};

const getPrLink = (prNum) => {
  // PR number is extraxted from the commit msg using a regex capture group inside of `getPrAndTicketRow`
  const prMatch = prNum.match(/\d+/);
  let prLinkString = '_No PR Found_'
  if (prMatch !== null) {
    const [cleanPrNum] = prMatch;
    prLinkString = `[${cleanPrNum}]`
      + `(https://github.com/SynapseUI/dashboard_v3/pull/${cleanPrNum})`;
  };
  return prLinkString;
};

const getFileNameRow = (acc, fileName) => {
  // index of . in file extension of full path
  const hasExtension = fileName.match(/\.[jt]sx?$/);
  const extIdx = hasExtension !== null ? hasExtension.index : fileName.length;
  // index of last / in file name
  const fileNameStartIdx = fileName.lastIndexOf('/') + 1;
  const fileNameStripped = fileName.slice(fileNameStartIdx, extIdx);
  const tableRowStr = `| \`${fileNameStripped}\` | -- |`;
  return [...acc, tableRowStr];
}

const getPrAndTicketRow = (acc, commitMsg) => {
  const isPrMergeMatch = commitMsg.match(
    /Merge pull request #(?<prNum>\d+) from SynapseUI\/(?<ticketNum>[A-Z]{2,10}-\d+)/
  );
  if (isPrMergeMatch === null) {
    return acc;
  };

  // grab requisite nums from regex match groupds
  const { prNum, ticketNum } = isPrMergeMatch.groups;

  const prLink = getPrLink(prNum);
  const ticketLink = getTaskLink(ticketNum)

  return acc.includes(ticketLink)
    ? acc
    : [...acc, `| ${prLink} | ${ticketLink} | -- |`];
}

/*
 * -----------------------------------------------------------------------------------------
 * -------------------------------------- Flag Helpers -------------------------------------
 * -----------------------------------------------------------------------------------------
 */

/**
 * @description inserts the correct git -C argument if the --repo-dir flag is passed
 */
const getDiffCmdString = (baseBranch, headBranch) => {
  const diffCmdArr = [
    `git`,
    `--no-pager log --pretty="tformat:%s" origin/${baseBranch}...origin/${headBranch}`
  ];

  return diffCmdArr.filter(Boolean).join(' ');
}

/**
 * @description handles output based on flags passed
 */
const handleOutput = (flags, templateStr, headBranch) => {
  const {
    ['--print-only']: printOnly,
    ['--open-after']: openAfter,
    ['--file-name']: fileName,
  } = flags;

  if (printOnly) {
    return process.stdout.write(templateStr + '\n', );
  };

  createOutDirIfNeeded('.prMarkdown');
  const mdFileName = fileName
    ? `.prMarkdown/${fileName}.md`
    : `.prMarkdown/prUpdates-${headBranch}.md`;

  fs.writeFileSync(mdFileName, templateStr);

  if (openAfter) {
    execSync(`code ${mdFileName}`)
  }
}

/**
 * @description builds the file contents string
 */
const makeFileContents = (flags, filesChangedStr, headBranch, baseBranch) => {
  const {
    ['--table-only']: tableOnly,
  } = flags;

  const isOnlyTickets = ['uat', 'main', 'CF-000'].includes(baseBranch);
  const filesChanged = filesChangedStr.split('\n');
  const stripFnToUse = isOnlyTickets ? getPrAndTicketRow : getFileNameRow;

  const strippedChanges = filesChanged.filter(Boolean).reduce(stripFnToUse, []);

  const tableToUse = isOnlyTickets ? ticketFileRows : tableFileRows;
  // for (const changeMade of strippedChanges) {
  for (const changeMade of strippedChanges) {
    tableToUse.push(changeMade);
  };

  if (tableOnly || isOnlyTickets) {
    return tableToUse.join('\n');
  } else {
    return [...headFileRows, ...tableToUse, ...tailFileRows].join('\n');
  };
};

/*
 * -----------------------------------------------------------------------------------------
 * --------------------------------- Main Script Execution ---------------------------------
 * -----------------------------------------------------------------------------------------
 */


const { headBranch, baseBranch } = getArgs(process.argv);

const filesChangedStr = execSync(
  getDiffCmdString(baseBranch, headBranch),
  { encoding: 'utf8' },
);

console.log(filesChangedStr)

// headFileRows[0] = headFileRows[0] + getTaskLink(headBranch);
// const fileAsString = makeFileContents(flags, filesChangedStr, headBranch, baseBranch);
// handleOutput(flags, fileAsString, headBranch);
