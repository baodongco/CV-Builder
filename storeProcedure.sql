
-- Insert user defined store procedure getAllResumeData
CREATE PROCEDURE udsp_getAllResumeData( IN _resId INT)
BEGIN   
  SELECT * FROM resume WHERE id = _resID;

  SELECT * FROM certification where resId = _resID;

  SELECT * FROM education WHERE resId = _resID;

  SELECT * FROM experience WHERE resId = _resID;

  SELECT * FROM project WHERE resId = _resID;
  
  SELECT * FROM skill WHERE resId = _resID;
END