create table "Products" (
	"id" serial primary key,
	"title" text,
	"description" text
);

insert into "Products"("title", "description")
select md5(random()::text), md5(random()::text)
from generate_series(1, 1000)