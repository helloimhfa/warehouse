-- Table: public.articles

-- DROP TABLE IF EXISTS public.articles;

CREATE TABLE IF NOT EXISTS public.articles
(
    id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    stock integer NOT NULL DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT articles_pkey PRIMARY KEY (id),
    CONSTRAINT articles_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.articles
    OWNER to warehouse;

-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" DEFAULT 'Product description'::character varying,
    price double precision NOT NULL DEFAULT '0'::double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT products_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to warehouse;

-- Table: public.product_articles

-- DROP TABLE IF EXISTS public.product_articles;

CREATE TABLE IF NOT EXISTS public.product_articles
(
    amount integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "articleId" uuid NOT NULL,
    "productId" uuid NOT NULL,
    CONSTRAINT product_articles_pkey PRIMARY KEY ("articleId", "productId"),
    CONSTRAINT "product_articles_articleId_fkey" FOREIGN KEY ("articleId")
        REFERENCES public.articles (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "product_articles_productId_fkey" FOREIGN KEY ("productId")
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_articles
    OWNER to warehouse;

-- Table: public.locked_articles

-- DROP TABLE IF EXISTS public.locked_articles;

CREATE TABLE IF NOT EXISTS public.locked_articles
(
    id uuid NOT NULL,
    "articleId" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT locked_articles_pkey PRIMARY KEY (id),
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.locked_articles
    OWNER to warehouse;

-- Populate public.articles
INSERT INTO
    public.articles(id, name, stock, "createdAt", "updatedAt")
VALUES 
    ('1ec94d0d-4a1f-428d-a4d7-2b08306147cd', 'leg', 12, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z'),
    ('8d6376d6-14ae-4750-b809-f2fe00927fab', 'screw', 17, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z'),
    ('41a65cbe-07e5-4544-ad56-cbb21fb039db', 'seat', 2, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z'),
    ('38c472db-870e-4918-a895-f06c0806384d', 'table top', 1, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z');

-- Populate public.products
INSERT INTO
    public.products(id, name, description, price, "createdAt", "updatedAt")
VALUES
    ('e5e120a1-fdcc-45a9-999a-06c21374d27c', 'Dinning chair', 'Wooden and comfy chair', 45.95, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z'),
    ('b8c55b0c-7a78-4852-85ad-4c20a66a2ae6', 'Dinning table', 'Medium size table made of wood', 120.85, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z');

-- Populate public.product_articles
INSERT INTO
    public.product_articles(amount, "createdAt", "updatedAt", "articleId", "productId")
VALUES
    (4, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z', '1ec94d0d-4a1f-428d-a4d7-2b08306147cd', 'e5e120a1-fdcc-45a9-999a-06c21374d27c'), 
    (8, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z', '8d6376d6-14ae-4750-b809-f2fe00927fab', 'e5e120a1-fdcc-45a9-999a-06c21374d27c'), 
    (1, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z', '41a65cbe-07e5-4544-ad56-cbb21fb039db', 'e5e120a1-fdcc-45a9-999a-06c21374d27c'), 
    (4, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z', '1ec94d0d-4a1f-428d-a4d7-2b08306147cd', 'b8c55b0c-7a78-4852-85ad-4c20a66a2ae6'), 
    (8, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z', '8d6376d6-14ae-4750-b809-f2fe00927fab', 'b8c55b0c-7a78-4852-85ad-4c20a66a2ae6'), 
    (1, '2022-10-22T10:30:57.355Z', '2022-10-22T10:30:57.355Z', '38c472db-870e-4918-a895-f06c0806384d', 'b8c55b0c-7a78-4852-85ad-4c20a66a2ae6');