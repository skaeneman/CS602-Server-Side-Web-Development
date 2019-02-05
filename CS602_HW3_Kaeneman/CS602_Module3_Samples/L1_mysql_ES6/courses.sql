drop table if exists met_courses;

create table met_courses (
  id int(11) NOT NULL AUTO_INCREMENT,
  course_number varchar(32) NOT NULL,
  course_name   varchar(200) NOT NULL,
  PRIMARY KEY (id)
);
	
INSERT INTO met_courses (id, course_number, course_name) VALUES
		(1, 'cs520', 'Information Structures'),
		(2, 'cs601', 'Web Application Development'),
		(3, 'cs602 ', 'Server-Side Web Development');
