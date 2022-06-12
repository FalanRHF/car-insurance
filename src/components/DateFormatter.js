const formatDate = (ISOString) => {
  const date = new Date(ISOString)
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return '' + dd + '/' + mm + '/' + yyyy;
  return date
  return '' + date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
}

export default formatDate