const Notification = ({ message, isError }) => {
  if (message === "") {
    return null;
  }
  if (isError) {
    return <div className="notification-failure">{message}</div>;
  }
  return <div className="notification-success">{message}</div>;
};

export default Notification;
