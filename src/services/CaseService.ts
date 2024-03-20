import http from "../http-common";
import ICaseData from "../types/Case";

const getAll = () => {
  return http.get<Array<ICaseData>>("/cases");
};

const get = (id: any) => {
  return http.get<ICaseData>(`/cases/${id}`);
};

const create = (data: ICaseData) => {
  return http.post<ICaseData>("/cases", data);
};

const update = (id: any, data: ICaseData) => {
  return http.put<any>(`/cases/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/cases/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/cases`);
};

const findByTitle = (title: string) => {
  return http.get<Array<ICaseData>>(`/cases?title=${title}`);
};

const CaseService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default CaseService;
