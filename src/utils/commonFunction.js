const token = '123456'

// 根据code得到name
const getNameByCode = (code, list, codeProperty, nameProperty) => {
  console.log('code, list, codeProperty, nameProperty===', code, list, codeProperty, nameProperty);
  let name = '';
  if (code && Array.isArray(list)) {
    list.some((record) => {
      if (record[codeProperty] === code) {
        name = record[nameProperty];
        return true;
      }
      return false;
    });
  }
  return name;
};

export default{
  token,
  getNameByCode
}