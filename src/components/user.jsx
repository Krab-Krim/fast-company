import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({user, ...props}) => {
    const getListUsers = user.map((item) => {
        return <tr key={item._id}>
            <td>{item.name}</td>
            <td>
                <Qualitie color={item}/>
            </td>
            <td>{item.profession.name}</td>
            <td>{item.completedMeetings}</td>
            <td>{item.rate}</td>
            <td>
                <BookMark
                    onToggleBookMark={props.onToggleBookMark}
                    status={item}
                />
            </td>
            <td>
                <button
                    type="button" className="btn btn-danger"
                    onClick={() => props.onDelete(item._id)}
                    key={item._id}
                >
                    delete
                </button>
            </td>
        </tr>
    });

    return <>
        {getListUsers}
    </>
}

export default User;