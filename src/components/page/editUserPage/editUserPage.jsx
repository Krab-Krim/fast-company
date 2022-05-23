import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
import pictures from "../../../statics/images/images.png";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import NameField from "../../common/form/nameField";
import Loader from "../../common/loader";

const EditUserPage = () => {
    const [editUserPage, setEditUserPage] = useState();
    const [dataUser, setDataUser] = useState({
        _id: "",
        name: "",
        email: "",
        sex: "",
        profession: "",
        qualities: []
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    const infoLocalStorage = localStorage.getItem("users");
    const params = useParams();
    const { userId } = params;
    const infoLocalStorageArray = JSON.parse(infoLocalStorage);

    const incomingModificationsQualities = (elem) => {
        const qualities = elem.qualities.map((quality) => {
            if (quality._id) {
                return {
                    value: quality._id,
                    label: quality.name,
                    color: quality.color
                };
            } else {
                return quality;
            }
        });
        return qualities;
    };

    const outgoingModificationsQualities = (elem) => {
        const qualities = elem.map((quality) => {
            if (quality.value) {
                return {
                    _id: quality.value,
                    name: quality.label,
                    color: quality.color
                };
            } else {
                return quality;
            }
        });
        return qualities;
    };

    useEffect(() => {
        api.users.update(userId, editUserPage).then((elem) => {
            setEditUserPage(elem);
            const qualities = incomingModificationsQualities(elem);
            setDataUser({
                bookmark: elem.bookmark,
                completedMeetings: elem.completedMeetings,
                _id: elem._id,
                name: elem.name,
                email: elem.email,
                profession: elem.profession,
                qualities: qualities,
                rate: elem.rate,
                sex: elem.sex
            });
        });
    }, []);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            if (data) document.body.style.backgroundImage = `url(${pictures})`;
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.values(data).map((optionName) => ({
                value: optionName._id,
                label: optionName.name,
                color: optionName.color
            })
            );
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setDataUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        if (target.name === "qualities") {
            const qualities = outgoingModificationsQualities(target.value);
            dataUser.qualities = qualities;
            updateDataUser(dataUser);
        }
    };

    const updateDataUser = (dataUser) => {
        const changedInfoLocalStorageArray = infoLocalStorageArray.map((item) => {
            if (item._id === dataUser._id && professions.length > 0) {
                const profId = typeof dataUser.profession === "string"
                    ? dataUser.profession
                    : dataUser.profession._id;
                const profession = professions.find(prof => prof.value === profId);
                dataUser.profession = {
                    name: profession.label,
                    _id: profession.value
                };
                return dataUser;
            } else {
                return item;
            }
        });
        const newDataUsers = JSON.stringify(changedInfoLocalStorageArray);
        localStorage.setItem("users", newDataUsers);
    };

    updateDataUser(dataUser);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [dataUser]);
    const validate = () => {
        const errors = validator(dataUser, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = dataUser;
        console.log({
            ...dataUser,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    const history = useHistory();

    const handleSave = () => {
        const qualities = outgoingModificationsQualities(dataUser.qualities);
        dataUser.qualities = qualities;
        updateDataUser(dataUser);
        history.push(`/users/${userId}`);
    };

    return (
        <>
            {
                professions.length > 0
                    ? <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <form onSubmit={handleSubmit}>
                                    <NameField
                                        label="Имя"
                                        name="name"
                                        value={dataUser.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                    />
                                    <TextField
                                        label="Электронная почта"
                                        name="email"
                                        value={dataUser.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <SelectField
                                        label="Выбери свою профессию"
                                        defaultOption={dataUser.profession.name}
                                        options={professions}
                                        name="profession"
                                        onChange={handleChange}
                                        value={dataUser.profession._id}
                                        error={errors.profession}
                                    />
                                    <RadioField
                                        options={[
                                            { name: "Male", value: "male" },
                                            { name: "Female", value: "female" },
                                            { name: "Other", value: "other" }
                                        ]}
                                        value={dataUser.sex}
                                        name="sex"
                                        onChange={handleChange}
                                        label="Выберите ваш пол"
                                    />
                                    <MultiSelectField
                                        options={qualities}
                                        onChange={handleChange}
                                        defaultValue={dataUser.qualities}
                                        name="qualities"
                                        label="Выберите ваши качества"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 mx-auto"
                                        onClick={() => handleSave()}
                                        disabled={!isValid}
                                    >
                                        Обновить
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    : <Loader/>
            }
        </>
    );
};

export default EditUserPage;
