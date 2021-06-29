const DateFormat = (datetime) => {
    const date = new Date(datetime);
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yy = date.getFullYear();
    return [yy, (mm < 10 ? "0" : "") + mm, (dd < 10 ? "0" : "") + dd].join('-')
}

const baseURL ="https://kibana.ampath.or.ke/amrs/ws/rest/v1/";

export {DateFormat, baseURL};