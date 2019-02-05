drop table if exists Weather;
create table Weather (
  city varchar(100) not null,
  temperature integer not null
);
	
insert into Weather (city, temperature) values ('Austin', 48);
insert into Weather (city, temperature) values ('Baton Rouge', 57);
insert into Weather (city, temperature) values ('Jackson', 50);
insert into Weather (city, temperature) values ('Montgomery', 53);
insert into Weather (city, temperature) values ('Phoenix', 67);
insert into Weather (city, temperature) values ('Sacramento', 66);
insert into Weather (city, temperature) values ('Santa Fe', 27);
insert into Weather (city, temperature) values ('Tallahassee', 59);

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
