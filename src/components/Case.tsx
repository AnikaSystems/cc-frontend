import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import CaseDataService from "../services/CaseService";
import ICaseData from "../types/Case";

const Case: React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialCaseState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentCase, setCurrentCase] = useState<ICaseData>(initialCaseState);
  const [message, setMessage] = useState<string>("");

  const getCase = (id: string) => {
    CaseDataService.get(id)
      .then((response: any) => {
        setCurrentCase(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getCase(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentCase({ ...currentCase, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentCase.id,
      title: currentCase.title,
      description: currentCase.description,
      published: status
    };

    CaseDataService.update(currentCase.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentCase({ ...currentCase, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateCase = () => {
    CaseDataService.update(currentCase.id, currentCase)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The case was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteCase = () => {
    CaseDataService.remove(currentCase.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/case");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCase ? (
        <div className="edit-form">
          <h4>Case</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentCase.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCase.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCase.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentCase.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteCase}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCase}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Case...</p>
        </div>
      )}
    </div>
  );
};

export default Case;
