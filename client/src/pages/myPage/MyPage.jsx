import styled from 'styled-components';
import Profile from './Profile.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyReivew from './MyReivew.jsx';
import MyBookmark from './MyBookmark.jsx';
import MyRestaurant from './MyRestaurant.jsx';

function MyPage() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [role, setRole] = useState();

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_URL}/members/${id}`).then(res => {
  //     setUserInfo(res.data.data);
  //     setRole(res.data.data.role[0]);
  //   });
  // }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/members/${id}`).then(res => {
      setUserInfo(res.data);
      setRole(res.data.role[0]);
    });
  }, []);

  console.log(role);

  if (role === 'USER') {
    return (
      <>
        <MyPageBlock>
          <MyPageLayout>
            <Profile userInfo={userInfo} />
            <MyReivew />
            <MyBookmark />
          </MyPageLayout>
        </MyPageBlock>
      </>
    );
  }
  if (role === 'OWNER') {
    return (
      <>
        <MyPageBlock>
          <MyPageLayout>
            <Profile userInfo={userInfo} />
            <MyRestaurant />
          </MyPageLayout>
        </MyPageBlock>
      </>
    );
  }
  return <p>없는 권한입니다. 다시 확인해주십시오</p>;
}

const MyPageBlock = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 4rem 0 8rem;
`;

const MyPageLayout = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin: 20px;
  @media screen and (max-width: 1244px) {
    max-width: -webkit-fill-available;
  }
`;

export default MyPage;
