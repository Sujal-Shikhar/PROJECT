import axios from "./axios";

/*
==========================================
GET ALL FEES
==========================================
*/

export const getFees = async (params = {}) => {
  const { data } = await axios.get("/fees", {
    params,
  });

  return data;
};

/*
==========================================
GET FEE BY ID
==========================================
*/

export const getFeeById = async (id) => {
  const { data } = await axios.get(
    `/fees/${id}`
  );

  return data;
};

/*
==========================================
CREATE FEE
==========================================
*/

export const createFee = async (
  feeData
) => {
  const { data } = await axios.post(
    "/fees",
    feeData
  );

  return data;
};

/*
==========================================
UPDATE FEE
==========================================
*/

export const updateFee = async (
  id,
  feeData
) => {
  const { data } = await axios.put(
    `/fees/${id}`,
    feeData
  );

  return data;
};

/*
==========================================
DELETE FEE
==========================================
*/

export const deleteFee = async (
  id
) => {
  const { data } = await axios.delete(
    `/fees/${id}`
  );

  return data;
};

/*
==========================================
RESTORE FEE
==========================================
*/

export const restoreFee = async (
  id
) => {
  const { data } = await axios.put(
    `/fees/restore/${id}`
  );

  return data;
};

/*
==========================================
SEARCH FEES
==========================================
*/

export const searchFees = async (
  keyword
) => {
  const { data } = await axios.get(
    "/fees/search",
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
RECORD PAYMENT
==========================================
*/

export const recordPayment = async (
  id,
  paymentData
) => {
  const { data } = await axios.put(
    `/fees/payment/${id}`,
    paymentData
  );

  return data;
};

/*
==========================================
GET STUDENT FEES
==========================================
*/

export const getStudentFees =
  async (studentId) => {
    const { data } = await axios.get(
      `/fees/student/${studentId}`
    );

    return data;
  };

/*
==========================================
PENDING FEES
==========================================
*/

export const getPendingFees =
  async () => {
    const { data } = await axios.get(
      "/fees/pending"
    );

    return data;
  };

/*
==========================================
PARTIAL FEES
==========================================
*/

export const getPartialFees =
  async () => {
    const { data } = await axios.get(
      "/fees/partial"
    );

    return data;
  };

/*
==========================================
PAID FEES
==========================================
*/

export const getPaidFees =
  async () => {
    const { data } = await axios.get(
      "/fees/paid"
    );

    return data;
  };

/*
==========================================
FEE STATISTICS
==========================================
*/

export const getFeeStats =
  async () => {
    const { data } = await axios.get(
      "/fees/stats"
    );

    return data;
  };

/*
==========================================
DASHBOARD SUMMARY
==========================================
*/

export const getFeeDashboard =
  async () => {
    const { data } = await axios.get(
      "/fees/dashboard"
    );

    return data;
  };