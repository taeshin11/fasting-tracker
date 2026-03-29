// Google Apps Script — Fasting Tracker Webhook
// Sheet: fasting-tracker-data

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    // Determine which tab to write to
    var tabName = data.event_type || "general";
    var tab = sheet.getSheetByName(tabName);
    if (!tab) {
      tab = sheet.insertSheet(tabName);
      // Add headers based on event type
      if (tabName === "fast_start") {
        tab.appendRow(["Timestamp", "Protocol", "Custom Window", "User Agent", "Screen Resolution", "Referrer", "Session Count", "Country"]);
      } else if (tabName === "fast_complete") {
        tab.appendRow(["Timestamp", "Start Time", "Duration (min)", "Protocol", "Completed"]);
      } else if (tabName === "visitor") {
        tab.appendRow(["Timestamp", "Page", "User Agent", "Referrer"]);
      }
    }

    // Append the data row
    var row = data.row || Object.values(data);
    tab.appendRow(row);

    // Return visitor count if requested
    if (data.event_type === "visitor") {
      var visitorTab = sheet.getSheetByName("visitor");
      var totalCount = visitorTab ? visitorTab.getLastRow() - 1 : 1;
      var today = new Date().toISOString().split('T')[0];
      var todayCount = 0;
      if (visitorTab && visitorTab.getLastRow() > 1) {
        var timestamps = visitorTab.getRange(2, 1, visitorTab.getLastRow() - 1, 1).getValues();
        timestamps.forEach(function(ts) {
          if (ts[0] && ts[0].toString().startsWith(today)) todayCount++;
        });
      }
      return ContentService.createTextOutput(JSON.stringify({
        today: todayCount,
        total: totalCount
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({status: "ok"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Also handle GET for visitor count retrieval
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var visitorTab = sheet.getSheetByName("visitor");
  var totalCount = visitorTab ? visitorTab.getLastRow() - 1 : 0;
  var today = new Date().toISOString().split('T')[0];
  var todayCount = 0;
  if (visitorTab && visitorTab.getLastRow() > 1) {
    var timestamps = visitorTab.getRange(2, 1, visitorTab.getLastRow() - 1, 1).getValues();
    timestamps.forEach(function(ts) {
      if (ts[0] && ts[0].toString().startsWith(today)) todayCount++;
    });
  }
  return ContentService.createTextOutput(JSON.stringify({
    today: todayCount,
    total: totalCount
  })).setMimeType(ContentService.MimeType.JSON);
}
