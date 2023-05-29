const capital = (arr) =>
  arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase()
  );
export default (str) => capital(str.split('-')).join('');
