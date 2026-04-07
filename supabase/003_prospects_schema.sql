-- Prospects CRM — контакты потенциальных арендодателей
CREATE TABLE prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Источник
  source TEXT NOT NULL,          -- 'olx' | 'ceidg' | 'google_maps' | 'manual'
  source_url TEXT,
  source_id TEXT,

  -- Контакт
  company_name TEXT,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  voivodeship TEXT,
  nip TEXT,
  regon TEXT,

  -- Техника
  equipment_description TEXT,
  equipment_types TEXT[],

  -- Статус outreach
  status TEXT NOT NULL DEFAULT 'new',
    -- new -> queued -> contacted -> responded -> registered | rejected

  -- Дедупликация
  dedup_key TEXT UNIQUE,         -- нормализованный телефон или NIP

  -- Мета
  notes TEXT,
  owner_id UUID REFERENCES owners(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Лог outreach-сообщений
CREATE TABLE outreach_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,

  channel TEXT NOT NULL DEFAULT 'email',  -- 'email' | 'phone' | 'manual'
  template_key TEXT,
  subject TEXT,

  -- Tracking
  resend_email_id TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,

  -- Ответ
  response TEXT,
  response_at TIMESTAMPTZ,
  notes TEXT
);

-- Индексы
CREATE INDEX idx_prospects_status ON prospects(status);
CREATE INDEX idx_prospects_source ON prospects(source);
CREATE INDEX idx_prospects_city ON prospects(city);
CREATE INDEX idx_prospects_dedup ON prospects(dedup_key);
CREATE INDEX idx_outreach_prospect ON outreach_logs(prospect_id);
CREATE INDEX idx_outreach_sent ON outreach_logs(sent_at);

-- RLS (permissive для MVP — доступ через service role)
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to prospects"
  ON prospects FOR ALL
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to outreach_logs"
  ON outreach_logs FOR ALL
  USING (true) WITH CHECK (true);
