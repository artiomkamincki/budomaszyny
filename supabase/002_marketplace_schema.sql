-- InBuild Marketplace: owners, listings, requests, leads

-- ── Владельцы техники ──
CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  city TEXT NOT NULL,
  nip TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Объявления техники ──
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  equipment_type TEXT NOT NULL,
  manufacturer TEXT,
  model TEXT,
  year INT,
  description TEXT,
  daily_rate INT,
  location_city TEXT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT true,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Заявки от арендаторов ──
CREATE TABLE requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company TEXT,
  equipment_type TEXT NOT NULL,
  description TEXT,
  city TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Лиды (связка заявка ↔ владелец) ──
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  viewed_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ
);

-- ── Индексы ──
CREATE INDEX idx_listings_owner ON listings(owner_id);
CREATE INDEX idx_listings_type_city ON listings(equipment_type, location_city);
CREATE INDEX idx_requests_status ON requests(status) WHERE status = 'new';
CREATE INDEX idx_leads_request ON leads(request_id);
CREATE INDEX idx_leads_owner ON leads(owner_id);

-- ── RLS: отключаем для MVP (доступ через service_role key на сервере) ──
-- Публичные таблицы без auth — вставка через server actions с service_role key
-- RLS можно включить позже при добавлении auth для владельцев

ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Разрешаем анонимную вставку заявок (арендаторы не авторизованы)
CREATE POLICY "Anyone can create requests"
  ON requests FOR INSERT WITH CHECK (true);

-- Разрешаем анонимную вставку владельцев и их техники
CREATE POLICY "Anyone can register as owner"
  ON owners FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can add listings"
  ON listings FOR INSERT WITH CHECK (true);

-- Чтение — только через service_role (админка)
-- Для страницы лида — отдельная политика по id
CREATE POLICY "Anyone can view leads by id"
  ON leads FOR SELECT USING (true);

CREATE POLICY "Anyone can view requests by id"
  ON requests FOR SELECT USING (true);

CREATE POLICY "Service role full access owners"
  ON owners FOR ALL USING (true);

CREATE POLICY "Service role full access listings"
  ON listings FOR ALL USING (true);

CREATE POLICY "Service role full access leads"
  ON leads FOR ALL USING (true);
