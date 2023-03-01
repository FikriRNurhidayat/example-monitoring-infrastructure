import http from "k6/http";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  http.get("http://localhost:8080/v1/notes", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmY4MjIwNThhNDk0N2JlYTdmY2YxMSIsInVzZXJuYW1lIjoiTHVuYV9CZXJuaGFyZCIsImV4cCI6NjAzOTY4MTc1NTMyMCwiaWF0IjoxNjc3Njg5Mzc2fQ.6LnoH8M2IbGOYrD4D0kWrPBgHVtkMIQ4IRnVfG3y0mg",
    },
  });
}
