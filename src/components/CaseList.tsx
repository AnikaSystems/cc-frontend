import React, { useState, useEffect, ChangeEvent } from "react";
import CaseDataService from "../services/CaseService";
import { Link } from "react-router-dom";
import ICaseData from '../types/Case';

const CasesList: React.FC = () => {
  const [caseData, setCases] = useState<Array<ICaseData>>([]);
  const [currentCase, setCurrentCase] = useState<ICaseData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveCases();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveCases = () => {
    CaseDataService.getAll()
      .then((response: any) => {
        setCases(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCases();
    setCurrentCase(null);
    setCurrentIndex(-1);
  };

  const setActiveCase = (caseData: ICaseData, index: number) => {
    setCurrentCase(caseData);
    setCurrentIndex(index);
  };

  const removeAllCases = () => {
    CaseDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    CaseDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setCases(response.data);
        setCurrentCase(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Cases List</h4>

        <ul className="list-group">
          {caseData &&
            caseData.map((caseDataItem, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCase(caseDataItem, index)}
                key={index}
              >
                {caseDataItem.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCases}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCase ? (
          <div>
            <h4>Case</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentCase.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentCase.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCase.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/cases/" + currentCase.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Case...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CasesList;
