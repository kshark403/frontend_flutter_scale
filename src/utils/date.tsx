export const getCurrentTimestamp = (digit: number = 10): number =>
  +new Date().getTime().toString().substr(0, digit);

export const getFormattedDate1 = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

// Version 2
export const getFormattedDate2 = (dateStr: string) => {
  const date = new Date(dateStr);

  // return date.toLocaleString("en-US", {
  //   timeZone: 'UTC'
  //   } );

  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });
  var hour = date.toLocaleString("default", { hour: "2-digit", hour12: false });
  var minute = "0" + date.toLocaleString("default", { minute: "2-digit", hour12: false });
  var second = "0" + date.toLocaleString("default", { second: "2-digit" });
  
  // var hour = ""

  // Generate custom date string
  var formattedDate = year + "-" + month + "-" + day + " " + hour + ":" + minute.substring(minute.length-2, minute.length)
      + ":" + second.substring(second.length-2, second.length);
  return formattedDate
};

export const formatNumber=(num: string)=>{
  // return num.toString().replace(/(\d)(?=(\d{3})+(?|\d))/g, '$1,')
  return (Number(num)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$&,');
}


// const sortAsc = (arr: any, field: string) => {
//   return arr.sort((a, b) => {
//     if (a[field] > b[field]) { return 1; }
//     if (b[field] > a[field]) { return -1; }
//     return 0;
//   })
// }

// const sortDesc = (aarr: object[], field: string) => {
//   return arr.sort((a, b) => {
//     if (a[field] > b[field]) { return -1; }
//     if (b[field] > a[field]) { return 1; }
//     return 0;
//   })
// }