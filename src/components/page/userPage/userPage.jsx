import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import Loader from "../../common/loader";
import pictures from "../../../statics/images/images.png";

const UserPage = ({ userListId }) => {
    const [userId, setUserId] = useState();

    useEffect(() => {
        api.users.getById(userListId).then((data) => {
            if (data) document.body.style.backgroundImage = `url(${pictures})`;
            setUserId(data);
        });
    }, []);

    const history = useHistory();

    const handleSave = () => {
        history.push(`/users/${userListId}/edit`);
    };

    return (
        userId
            ? <div className="m-3 page-header">
                <div className="d-flex flex-column" >
                    <div className="p-2">Имя пользователя: {userId.name}</div>
                    <div className="p-2">Профессия: {userId.profession.name}</div>
                    <div className="p-2">Качества: {userId.qualities.map((colors) => {
                        const className = `badge bg-${colors.color} m-2`;
                        return (
                            <span key={colors._id} className={className}>
                                {colors.name}
                            </span>
                        );
                    })}
                    </div>
                    <div className="p-2">Количество встреч: {userId.completedMeetings}</div>
                    <div className="p-2">Рейтинг: {userId.rate}</div>
                </div>
                <button type="button" className="btn btn-primary btn-lg" onClick={() => handleSave()}>Изменить</button>
            </div>
            : <Loader/>
    );
};

UserPage.propTypes = {
    userListId: PropTypes.string
};

export default UserPage;
