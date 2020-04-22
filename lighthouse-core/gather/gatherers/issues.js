/**
 * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Gatherer = require('./gatherer.js');

/**
 * @fileoverview Capture IssueAdded events
 */
class Issues extends Gatherer {
  /**
   * @param {LH.Gatherer.PassContext} passContext
   */
  async beforePass(passContext) {
    await passContext.driver.sendCommand('Audits.enable');
  }

  /**
   * @param {LH.Gatherer.PassContext} passContext
   * @param {LH.Gatherer.LoadData} loadData
   * @return {Promise<LH.Artifacts['Issues']>}
   */
  async afterPass(passContext, loadData) {
    const driver = passContext.driver;
    const devtoolsLog = loadData.devtoolsLog;
    const issues = devtoolsLog.filter(event => event.method === 'Audits.issueAdded');

    await driver.sendCommand('Audits.disable');
    return issues;
  }
}

module.exports = Issues;
