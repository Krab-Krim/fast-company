import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Loader from "../../common/loader";
import pictures from "../../../statics/images/images.png";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userListId }) => {
    const [userId, setUserId] = useState();

    useEffect(() => {
        api.users.getById(userListId).then((data) => {
            if (data) document.body.style.backgroundImage = `url(${pictures})`;
            setUserId(data);
        });
    }, []);

    return (
        userId
            ? <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={userId} userListId={userListId}/>
                        <QualitiesCard data={userId} />
                        <MeetingsCard value={userId.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
            : <Loader/>
    );
};

UserPage.propTypes = {
    userListId: PropTypes.string
};

export default UserPage;
