import axios from "./axios";

/*
==========================================
GET ALL NOTICES
==========================================
*/

export const getNotices = async (params = {}) => {
  const { data } = await axios.get("/notices", {
    params,
  });

  return data;
};

/*
==========================================
GET NOTICE BY ID
==========================================
*/

export const getNoticeById = async (id) => {
  const { data } = await axios.get(
    `/notices/${id}`
  );

  return data;
};

/*
==========================================
CREATE NOTICE
==========================================
*/

export const createNotice = async (
  noticeData
) => {
  const { data } = await axios.post(
    "/notices",
    noticeData
  );

  return data;
};

/*
==========================================
UPDATE NOTICE
==========================================
*/

export const updateNotice = async (
  id,
  noticeData
) => {
  const { data } = await axios.put(
    `/notices/${id}`,
    noticeData
  );

  return data;
};

/*
==========================================
DELETE NOTICE
==========================================
*/

export const deleteNotice = async (id) => {
  const { data } = await axios.delete(
    `/notices/${id}`
  );

  return data;
};

/*
==========================================
RESTORE NOTICE
==========================================
*/

export const restoreNotice = async (
  id
) => {
  const { data } = await axios.put(
    `/notices/restore/${id}`
  );

  return data;
};

/*
==========================================
SEARCH NOTICES
==========================================
*/

export const searchNotices = async (
  keyword
) => {
  const { data } = await axios.get(
    "/notices/search",
    {
      params: {
        search: keyword,
      },
    }
  );

  return data;
};

/*
==========================================
PUBLISH NOTICE
==========================================
*/

export const publishNotice = async (
  id
) => {
  const { data } = await axios.put(
    `/notices/publish/${id}`
  );

  return data;
};

/*
==========================================
UNPUBLISH NOTICE
==========================================
*/

export const unpublishNotice = async (
  id
) => {
  const { data } = await axios.put(
    `/notices/unpublish/${id}`
  );

  return data;
};

/*
==========================================
ACTIVE NOTICES
==========================================
*/

export const getActiveNotices =
  async () => {
    const { data } = await axios.get(
      "/notices/active"
    );

    return data;
  };

/*
==========================================
EXPIRED NOTICES
==========================================
*/

export const getExpiredNotices =
  async () => {
    const { data } = await axios.get(
      "/notices/expired"
    );

    return data;
  };

/*
==========================================
STATISTICS
==========================================
*/

export const getNoticeStats =
  async () => {
    const { data } = await axios.get(
      "/notices/stats"
    );

    return data;
  };

/*
==========================================
DASHBOARD
==========================================
*/

export const getNoticeDashboard =
  async () => {
    const { data } = await axios.get(
      "/notices/dashboard"
    );

    return data;
  };