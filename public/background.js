const RULE = {
  id: 1,
  condition: {
    // initiatorDomains: [chrome.runtime.id],
    resourceTypes: ['sub_frame'],
  },
  action: {
    type: 'modifyHeaders',
    responseHeaders: [
      { header: 'X-Frame-Options', operation: 'remove' },
      { header: 'Frame-Options', operation: 'remove' },
      // Uncomment the following line to suppress `frame-ancestors` error
      // {header: 'Content-Security-Policy', operation: 'remove'},
    ],
  },
};
chrome.declarativeNetRequest.updateSessionRules({
  removeRuleIds: [RULE.id],
  addRules: [RULE],
});