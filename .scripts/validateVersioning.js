#!/usr/bin/env node

/*
 * -----------------------------------------------------------------------------------------
 * ---------------------------------------- Imports ----------------------------------------
 * -----------------------------------------------------------------------------------------
 */

const process = require('process');
const { execSync } = require('child_process');

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

const versionErr = new Error('NO UPDATES TO PACKAGE VERSION FOUND. MAKE SURE TO UPDATE PACKAGE VERSION');

/**
 * @description rough comparing per semver rules, not number comparison, which means JavaScript native string comparison oddities work in our favor
 * '11' > '12' --> false
 * '12' > '11' --> true
 * '2' > '11'  --> true
 * '2' > '21'  --> false
 * '3-beta' > '2-beta' --> true
 * '1-beta' > '2-beta' --> false
 */
const checkVersions = (oldVersionStr, newVersionStr) => {
  if (!oldVersionStr || !newVersionStr) {
    throw versionErr;
  }
  const oldVersionArr = oldVersionStr.split('.');
  const newVersionArr = newVersionStr.split('.');

  let foundLargerNum = false;
  for (let i = 0; i < newVersionArr.length; i += 1) {
    const curOldNum = oldVersionArr[i];
    const curNewNum = newVersionArr[i];
    if (foundLargerNum === false && curNewNum > curOldNum) {
      foundLargerNum = true;
    };
  };

  if (foundLargerNum === false) {
    throw versionErr;
  }
};

const getDiffCmdString = (baseBranch, headBranch) => {
  const diffCmdArr = [
    `git`,
    `--no-pager diff origin/${baseBranch}...origin/${headBranch}`,
    'package.json',
  ];

  return diffCmdArr.filter(Boolean).join(' ');
}

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

const regex = new RegExp(/\s{2}"version":\s"(?<versionNumber>.*)",$/)
const foundVChanges = filesChangedStr.split('\n').reduce((acc, lineChange) => {
  if (regex.test(lineChange)) {
    const { versionNumber } = lineChange.match(regex).groups;
    return [...acc, versionNumber];
  }
  return acc;
}, []);

checkVersions(...foundVChanges)
