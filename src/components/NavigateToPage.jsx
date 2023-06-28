import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavigateToPage = ({ parameter }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/Forum/${parameter.search_type}/${parameter.event_id}`);
  }, [navigate, parameter]);

  // Return null or any placeholder content since this component doesn't render anything
  return null;
};

export default NavigateToPage;
