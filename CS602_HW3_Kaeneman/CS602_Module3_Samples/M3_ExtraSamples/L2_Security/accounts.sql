CREATE TABLE `accounts` (
`id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL, PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

INSERT INTO `accounts` (`id`, `name`, `email`) VALUES 
(1, 'karl', 'karl@hotmail.com'),
(2, 'john', 'john@gmail.com');
