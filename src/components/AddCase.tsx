import React, { useState, ChangeEvent } from "react";
import CaseDataService from "../services/CaseService";
import ICaseData from '../types/Case';

const AddCase: React.FC = () => {
  const initialCaseState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [caseData, setCase] = useState<ICaseData>(initialCaseState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCase({ ...caseData, [name]: value });
  };

  const saveCase = () => {
    var data = {
      title: caseData.title,
      description: caseData.description
    };

    CaseDataService.create(data)
      .then((response: any) => {
        setCase({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newCase = () => {
    setCase(initialCaseState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCase}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={caseData.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={caseData.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveCase} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCase;
