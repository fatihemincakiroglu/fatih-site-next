<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Sitemap — fatihemincakiroglu.com</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f7f5; color: #333; }
          .header { background: #111; padding: 24px 32px; display: flex; align-items: center; gap: 16px; }
          .header-logo { font-size: 18px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
          .header-logo span { color: #e8560a; }
          .header-badge { font-size: 11px; font-weight: 700; color: #e8560a; padding: 4px 10px; border: 1px solid rgba(232,86,10,0.4); border-radius: 20px; letter-spacing: 1px; }
          .container { max-width: 1100px; margin: 0 auto; padding: 32px 24px 64px; }
          .intro { background: #fff; border-radius: 14px; padding: 24px 28px; border: 1px solid #eee; margin-bottom: 28px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
          .intro-stat { text-align: center; }
          .intro-stat .num { font-size: 28px; font-weight: 900; color: #e8560a; line-height: 1; }
          .intro-stat .lbl { font-size: 12px; color: #aaa; margin-top: 4px; }
          .intro-divider { width: 1px; height: 40px; background: #eee; }
          .intro-text { flex: 1; font-size: 13px; color: #777; line-height: 1.6; }
          .section { margin-bottom: 28px; }
          .section-title { font-size: 13px; font-weight: 800; color: #aaa; letter-spacing: 2px; text-transform: uppercase; padding: 0 4px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
          .section-title::after { content: ''; flex: 1; height: 1px; background: #eee; }
          table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #eee; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
          thead tr { background: #1a1a1a; }
          thead th { padding: 13px 18px; text-align: left; font-size: 11px; font-weight: 700; color: #e8560a; letter-spacing: 1.5px; text-transform: uppercase; white-space: nowrap; }
          thead th:first-child { color: #aaa; }
          tbody tr { border-bottom: 1px solid #f5f5f5; transition: background 0.1s; }
          tbody tr:last-child { border-bottom: none; }
          tbody tr:hover { background: #faf9f7; }
          tbody td { padding: 12px 18px; font-size: 13px; vertical-align: middle; }
          .url-link { color: #2563eb; text-decoration: none; font-weight: 500; word-break: break-all; }
          .url-link:hover { color: #e8560a; }
          .badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
          .badge-weekly  { background: #dcfce7; color: #16a34a; }
          .badge-monthly { background: #eff6ff; color: #2563eb; }
          .badge-yearly  { background: #f5f5f5; color: #888; }
          .priority-bar { display: flex; align-items: center; gap: 8px; }
          .priority-fill { height: 5px; border-radius: 3px; background: #e8560a; min-width: 4px; }
          .priority-val { font-size: 12px; color: #999; font-weight: 600; }
          .date { font-size: 12px; color: #bbb; font-variant-numeric: tabular-nums; }
          /* Sitemap index */
          .sitemap-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
          .sitemap-card { background: #fff; border-radius: 14px; padding: 24px; border: 1px solid #eee; display: flex; flex-direction: column; gap: 10px; }
          .sitemap-card-title { font-size: 15px; font-weight: 800; color: #111; }
          .sitemap-card-url { font-size: 12px; color: #2563eb; word-break: break-all; text-decoration: none; }
          .sitemap-card-url:hover { color: #e8560a; }
          .sitemap-card-date { font-size: 11px; color: #bbb; }
          .sitemap-card-btn { display: inline-block; padding: 8px 16px; background: #e8560a; color: #fff; border-radius: 6px; font-size: 12px; font-weight: 700; text-decoration: none; margin-top: 4px; width: fit-content; }
          .sitemap-card-btn:hover { opacity: 0.85; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-logo">Fatih Emin <span>Çakıroğlu</span></div>
          <div class="header-badge">SITEMAP</div>
        </div>
        <div class="container">
          <xsl:apply-templates/>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- ── SITEMAP INDEX ── -->
  <xsl:template match="sitemap:sitemapindex">
    <div class="intro">
      <div class="intro-stat">
        <div class="num"><xsl:value-of select="count(sitemap:sitemap)"/></div>
        <div class="lbl">Sitemap Dosyası</div>
      </div>
      <div class="intro-divider"/>
      <div class="intro-text">
        Bu sitemap index dosyası, Türkçe ve İngilizce URL'leri ayrı dosyalarda organize eder.
        Google Search Console'a <strong>sitemap.xml</strong> URL'sini ekleyerek tüm dilleri tek seferde submit edebilirsiniz.
      </div>
    </div>

    <div class="sitemap-cards">
      <xsl:for-each select="sitemap:sitemap">
        <div class="sitemap-card">
          <xsl:choose>
            <xsl:when test="contains(sitemap:loc, 'sitemap-tr')">
              <div class="sitemap-card-title">🇹🇷 Türkçe Sitemap</div>
            </xsl:when>
            <xsl:when test="contains(sitemap:loc, 'sitemap-en')">
              <div class="sitemap-card-title">🇬🇧 English Sitemap</div>
            </xsl:when>
            <xsl:otherwise>
              <div class="sitemap-card-title">📄 Sitemap</div>
            </xsl:otherwise>
          </xsl:choose>
          <a class="sitemap-card-url" href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
          <div class="sitemap-card-date">Son güncelleme: <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></div>
          <a class="sitemap-card-btn" href="{sitemap:loc}">Görüntüle →</a>
        </div>
      </xsl:for-each>
    </div>
  </xsl:template>

  <!-- ── URL SET (TR or EN) ── -->
  <xsl:template match="sitemap:urlset">
    <xsl:variable name="isEN" select="contains(sitemap:url[1]/sitemap:loc, '/en/')"/>

    <div class="intro">
      <div class="intro-stat">
        <div class="num"><xsl:value-of select="count(sitemap:url)"/></div>
        <div class="lbl">URL</div>
      </div>
      <div class="intro-divider"/>
      <div class="intro-stat">
        <div class="num"><xsl:value-of select="count(sitemap:url[sitemap:changefreq='weekly'])"/></div>
        <div class="lbl">Haftalık</div>
      </div>
      <div class="intro-divider"/>
      <div class="intro-stat">
        <div class="num"><xsl:value-of select="count(sitemap:url[sitemap:changefreq='monthly'])"/></div>
        <div class="lbl">Aylık</div>
      </div>
      <div class="intro-divider"/>
      <div class="intro-text">
        <a href="/sitemap.xml" style="color:#e8560a;font-weight:700;">← Sitemap Index</a>
        — Her URL hreflang alternate linkleri içerir.
      </div>
    </div>

    <!-- Pages -->
    <xsl:variable name="pages" select="sitemap:url[not(contains(sitemap:loc, '/blog/')) and not(contains(sitemap:loc, '/rehber/')) and not(contains(sitemap:loc, '/guides/'))]"/>
    <xsl:if test="count($pages) > 0">
      <div class="section">
        <div class="section-title">Sayfalar (<xsl:value-of select="count($pages)"/>)</div>
        <table>
          <thead><tr>
            <th>URL</th>
            <th>Güncelleme</th>
            <th>Sıklık</th>
            <th>Öncelik</th>
          </tr></thead>
          <tbody>
            <xsl:for-each select="$pages">
              <tr>
                <td><a class="url-link" href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                <td><span class="date"><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></span></td>
                <td>
                  <xsl:choose>
                    <xsl:when test="sitemap:changefreq='weekly'"><span class="badge badge-weekly">Haftalık</span></xsl:when>
                    <xsl:when test="sitemap:changefreq='monthly'"><span class="badge badge-monthly">Aylık</span></xsl:when>
                    <xsl:otherwise><span class="badge badge-yearly">Yıllık</span></xsl:otherwise>
                  </xsl:choose>
                </td>
                <td>
                  <div class="priority-bar">
                    <div class="priority-fill" style="width:{number(sitemap:priority) * 60}px"/>
                    <span class="priority-val"><xsl:value-of select="sitemap:priority"/></span>
                  </div>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>
    </xsl:if>

    <!-- Blog -->
    <xsl:variable name="blogs" select="sitemap:url[contains(sitemap:loc, '/blog/')]"/>
    <xsl:if test="count($blogs) > 0">
      <div class="section">
        <div class="section-title">Blog (<xsl:value-of select="count($blogs)"/>)</div>
        <table>
          <thead><tr>
            <th>URL</th>
            <th>Güncelleme</th>
            <th>Sıklık</th>
            <th>Öncelik</th>
          </tr></thead>
          <tbody>
            <xsl:for-each select="$blogs">
              <tr>
                <td><a class="url-link" href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                <td><span class="date"><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></span></td>
                <td><span class="badge badge-monthly">Aylık</span></td>
                <td>
                  <div class="priority-bar">
                    <div class="priority-fill" style="width:{number(sitemap:priority) * 60}px"/>
                    <span class="priority-val"><xsl:value-of select="sitemap:priority"/></span>
                  </div>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>
    </xsl:if>

    <!-- Rehber/Guides -->
    <xsl:variable name="rehberler" select="sitemap:url[contains(sitemap:loc, '/rehber/') or contains(sitemap:loc, '/guides/')]"/>
    <xsl:if test="count($rehberler) > 0">
      <div class="section">
        <div class="section-title">Rehber / Guides (<xsl:value-of select="count($rehberler)"/>)</div>
        <table>
          <thead><tr>
            <th>URL</th>
            <th>Güncelleme</th>
            <th>Sıklık</th>
            <th>Öncelik</th>
          </tr></thead>
          <tbody>
            <xsl:for-each select="$rehberler">
              <tr>
                <td><a class="url-link" href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                <td><span class="date"><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></span></td>
                <td><span class="badge badge-monthly">Aylık</span></td>
                <td>
                  <div class="priority-bar">
                    <div class="priority-fill" style="width:{number(sitemap:priority) * 60}px"/>
                    <span class="priority-val"><xsl:value-of select="sitemap:priority"/></span>
                  </div>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
