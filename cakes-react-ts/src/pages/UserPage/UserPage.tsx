import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from 'react-i18next';
import "./UserPage.scss"
type Props = {};

const UserPage = (_props: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation();
  
  
  return (
    <div className="user-page">
      <div className="container">
        <div className="user-inner">
          <div className="title">
            <h1>{t('profile')}</h1>
          </div>
          {user && (
            <div className="user_header">
              <div className="user_headerGroup">
                <span>{t('name')}</span>
                <h3>{user.username}</h3>
              </div>
              <div className="user_headerGroup">
                <span>{t('phone')}</span>
                <h3>{user.phone}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
