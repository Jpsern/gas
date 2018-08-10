function run() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var template = spreadsheet.getSheetByName("テンプレ");
  var nameStr = _generateSheetName();

  if(template == null) {
    return;
  }

  if(spreadsheet.getSheetByName(nameStr) == null) {
    spreadsheet.setActiveSheet(template);
    spreadsheet.moveActiveSheet(0);
    spreadsheet.insertSheet(nameStr, 0, {template: template});
  }
}

function _generateSheetName() {
  var week = ["日","月","火","水","木","金","土"];
  var date = new Date();
  return Utilities.formatDate(date, "GMT", "M/d ") + week[date.getDay()];
}

function _isHoliday() {
  var today = new Date();

  //土日なら true
  var weekInt = today.getDay();
  if(weekInt <= 0 || 6 <= weekInt){
    return true;
  }

  //国民の祝日なら true
  if(!this.cacheCalendar]) {
    this.cacheCalendar = CalendarApp.getCalendarById(
      "ja.japanese#holiday@group.v.calendar.google.com"
    );
  }
  var todayEvents = this.cacheCalendar.getEventsForDay(today);
  if(todayEvents.length > 0){
    return true;
  }

  return false;
}
