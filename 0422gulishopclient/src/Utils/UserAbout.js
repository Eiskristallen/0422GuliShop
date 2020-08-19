import { v4 as uuidv4 } from 'uuid';
export default function getUserTempId() {
  let userTempId = localStorage.getItem('USERTEMPID_KEY');
  //如果该ID不存在,则创建
  if (!userTempId) {
    userTempId = uuidv4();
    localStorage.setItem('USERTEMPID_KEY', userTempId);
  }
  return userTempId;
}
