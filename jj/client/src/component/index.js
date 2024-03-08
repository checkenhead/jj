import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

/** 로그인 페이지로 이동 */
function Index() {
  
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <div>
    </div>
  )
}

export default Index
