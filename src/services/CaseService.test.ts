import http from "../http-common";
import CaseService from "../services/CaseService";
import ICaseData from "../types/Case";

jest.mock('../http-common');

describe('CaseService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('remove', async () => {
    const id = '1';
    (http.delete as jest.Mock).mockResolvedValue({});

    await CaseService.remove(id);
    expect(http.delete).toHaveBeenCalledWith(`/cases/${id}`);
  });

  it('removeAll', async () => {
    (http.delete as jest.Mock).mockResolvedValue({});

    await CaseService.removeAll();
    expect(http.delete).toHaveBeenCalledWith('/cases');
  });

});
