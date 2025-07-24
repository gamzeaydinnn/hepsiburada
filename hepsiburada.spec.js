require("dotenv").config();
const { test, expect } = require("@playwright/test");

test("Hepsiburada alışveriş otomasyonu", async ({ page }) => {
  const maill = process.env.MAIL;
  const passwordd = process.env.PASSWORD2;

  // 1. Siteye git
  await page.goto("https://www.hepsiburada.com/");
  await page.waitForTimeout(2000);
  await expect(
    page.getByRole("link", { name: "Hepsiburada", exact: true })
  ).toBeVisible();
  await expect(page.getByText("Premium'u keşfet")).toBeVisible();
  console.log("Hepsiburada ana sayfasına gidildi.");

  //çerezleri kabul et
  await expect(page.getByRole("button", { name: "Kabul et" })).toBeVisible();
  await page.getByRole("button", { name: "Kabul et" }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState("load");
  console.log("Çerezler kabul edildi.");

  //elektroniğe bas
  await expect(page.getByText("Elektronik").first()).toBeVisible({
    timeout: 10000,
  });
  await page.getByText("Elektronik").first().click();
  console.log("Elektronik kategorisine tıklandı.");

  //bilgisayar tablet
  await page.waitForLoadState("load");

  await expect(
    page.getByRole("link", { name: "Bilgisayar/Tablet" })
  ).toBeVisible({ timeout: 10000 });
  await page.getByRole("link", { name: "Bilgisayar/Tablet" }).click();
  await page.waitForLoadState("load");
  await page.waitForTimeout(2000);
  console.log("Bilgisayar/Tablet alt kategorisine geçildi.");

  //fiyat filtreleme
  await expect(page.locator('label[for="collapse-fiyat"]')).toBeVisible({
    timeout: 10000,
  });
  console.log("Fiyat filtreleme bölümü açıldı.");
  // en az fiyat
  await expect(page.getByRole("textbox", { name: "En az" })).toBeVisible({
    timeout: 10000,
  });
  await page.getByRole("textbox", { name: "En az" }).fill("25000");

  //en çok fiyat
  await expect(page.getByRole("textbox", { name: "En çok" })).toBeVisible({
    timeout: 10000,
  });
  await page.getByRole("textbox", { name: "En çok" }).fill("30000");
  await page.waitForTimeout(1000);
  expect(await page.getByRole("textbox", { name: "En az" }).inputValue()).toBe(
    "25000"
  );
  expect(await page.getByRole("textbox", { name: "En çok" }).inputValue()).toBe(
    "30000"
  );
  console.log("Fiyat aralığı 25000 - 30000 olarak girildi.");
  //fiyat filtreleme bölümündeki testler
  await expect(page.getByRole("link", { name: "Casper" }).nth(1)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Lenovo", exact: true }).nth(1)
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Asus", exact: true }).nth(1)
  ).toBeVisible();

  //arama
  await expect(page.getByRole("button", { name: "Filtrele" })).toBeVisible({
    timeout: 10000,
  });
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Filtrele" }).click();
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(2000);
  console.log("Filtreleme uygulandı.");

  //bilgisayarı seç

  await page.waitForLoadState("load");

  await expect(
    page.getByRole("link", {
      name: "Teslimat bilgisi: Yarın kargoda Listene ekle: Casper Excalibur G770.1245-DFJ0X-",
    })
  ).toBeVisible();
  console.log("Ürün sayfada bulundu, tıklanacak.");
  const popupPromise = page.waitForEvent("popup");
  await page
    .getByRole("link", {
      name: "Teslimat bilgisi: Yarın kargoda Listene ekle: Casper Excalibur G770.1245-DFJ0X-",
    })
    .click();

  /*
  await expect(
    page.getByRole("link", {
      name: "Teslimat bilgisi: Bugün kargoda Listene ekle: Casper Excalibur G770.1245-DFJ0X-",
    })
  ).toBeVisible();

  console.log("Ürün sayfada bulundu, tıklanacak.");

  // Tıklamadan önce yeni sayfayı bekelemeye dinlemeye başla
  const popupPromise = page.waitForEvent("popup");

  // Ürün linkine tıkla
  await page
    .getByRole("link", {
      name: "Teslimat bilgisi: Bugün kargoda Listene ekle: Casper Excalibur G770.1245-DFJ0X-",
    })
    .click();
*/
  // Açılan yeni sekmeyi yakala
  const popup = await popupPromise;

  // Yeni sekme tamamen yüklensin
  await popup.waitForLoadState();
  console.log("Ürün yeni sekmede açıldı.");

  // Yeni sekmede sepete ekle butonuna tıkla
  await expect(popup.getByText("Satıcı: HepsiburadaResmi Satı")).toBeVisible();
  await expect(popup.locator('[data-test-id="addToCart"]')).toBeVisible({
    timeout: 10000,
  });
  await popup.locator('[data-test-id="addToCart"]').click();
  console.log("Ürün sepete eklendi.");

  // Sepete git butonuna tıkla
  await page.waitForLoadState("load");
  await expect(popup.getByText("Ürün sepetinizde")).toBeVisible();
  await expect(popup.getByRole("button", { name: "Sepete git" })).toBeVisible({
    timeout: 10000,
  });
  await popup.getByRole("button", { name: "Sepete git" }).click();
  console.log("Sepete gidildi.");

  //sepetteki test
  await expect(popup.getByText("Sepetim(1 ürün)Ürünleri sil")).toBeVisible();

  //ürünü artır
  await expect(popup.getByLabel("Ürünü Arttır")).toBeVisible({
    timeout: 10000,
  });
  await popup.getByLabel("Ürünü Arttır").click();
  const miktar = await popup.locator('input[name="quantity"]').inputValue();
  expect(miktar).toBe("2");
  console.log("Ürün miktarı arttırıldı.");

  //ürünü azalt
  await expect(popup.getByLabel("Ürünü Azalt")).toBeVisible({ timeout: 10000 });
  await popup.getByLabel("Ürünü Azalt").click();
  const miktarr = await popup.locator('input[name="quantity"]').inputValue();
  expect(miktarr).toBe("1");
  console.log("Ürün miktarı azaltıldı.");

  //ürün adı ve miktarı doğru mu
  const anaSayfaUrunAdi = await page
    .locator('span.title-module_titleText__8FlNQ:has-text("Excalibur G770")')
    .innerText();
  const sepet = await popup
    .getByText("Casper Excalibur G770.1245-", { exact: false })
    .textContent();
  expect(anaSayfaUrunAdi?.trim()).toBe(sepet?.trim());
  console.log("Ana sayfadaki ürün ile sepetteki ürün ismi aynı.");

  // Ürün miktarını kontrol etme
  const urunMiktariInput = await popup.locator('input[name="quantity"]');

  // Input değerini al ve kontrol et
  const urunMiktari = await urunMiktariInput.inputValue();
  expect(urunMiktari).toBe("1");
  console.log(`Ürün Miktarı: ${urunMiktari}`);

  //Ürün fiyat karşılaştırması
  await popup.waitForTimeout(4000);
  const fiyatString = await page
    .locator('[data-test-id="final-price-13"]')
    .innerText();
  const fiyat = parseInt(
    fiyatString.replace("TL", "").replace(".", "").trim(),
    10
  );
  console.log(fiyat);

  //sepet fiyatı
  const fiyatText = await popup.locator("div.product_price_uXU6Q").innerText();
  const fiyat2 = parseInt(
    fiyatText.replace("TL", "").replace(".", "").trim(),
    10
  );
  console.log(fiyat2);

  //sepete yeni ürün ekle
  await popup.waitForLoadState("load");
  await expect(
    popup.locator('[data-test-id="product-info-wrapper"]').first()
  ).toBeVisible({ timeout: 10000 });
  await popup.locator('[data-test-id="product-info-wrapper"]').first().click();
  await expect(popup.locator('[data-test-id="addToCart"]')).toBeVisible({
    timeout: 10000,
  });
  await popup.waitForLoadState("load");
  await popup.locator('[data-test-id="addToCart"]').click();
  console.log("Yeni ürün eklendi");
  await popup.waitForLoadState("load");

  //sepete git
  await expect(popup.getByText("Ürün sepetinizde")).toBeVisible();
  await expect(popup.getByRole("button", { name: "Sepete git" })).toBeVisible({
    timeout: 10000,
  });
  await popup.getByRole("button", { name: "Sepete git" }).click();
  console.log("Sepete gidildi");
  // sepetin son durum testi
  await expect(popup.getByText("Sepetim(2 ürün)Ürünleri sil")).toBeVisible();

  //sepetteki ürünü sil
  await popup.waitForLoadState("load");

  // Sepette "Sepetten Çıkar" butonuna tıkla
  await popup.getByLabel("Sepetten Çıkar").first().click();
  console.log("Yeni ürün sepetten çıkarıldı");

  // Biraz bekle, ürünün silinmesini izle

  await popup.waitForTimeout(1000);

  // Sepette ürün kalmadı mı kontrol et
  expect(await popup.locator("div.product_area_VUdcT").count()).toBe(1);
  const urunVarMi = await popup.locator("div.product_area_VUdcT").count();
  expect(urunVarMi).toBe(1);
  console.log("Yeni ürün sepetten çıkarıldı");
  // Sepetteki son ürünü çıkar
  await expect(popup.getByLabel("Sepetten Çıkar")).toBeVisible();
  await popup.getByLabel("Sepetten Çıkar").click();
  await popup.waitForTimeout(1000);
  const urunVarMi2 = await popup.locator("div.product_area_VUdcT").count();
  expect(urunVarMi2).toBe(0);

  //kupon kodu
  /*
  await expect(popup.getByLabel("Kupon kodu ekle")).toBeVisible({
    timeout: 10000,
  });
  await popup.getByLabel("Kupon kodu ekle").click();
  console.log("Kupon kodu ekle butonuna tıklandı.");

  //hesaba giriş
  //username
  await popup.waitForTimeout(3000);
  await popup.waitForLoadState("load");
  await expect(
    popup.getByRole("textbox", { name: "E-posta adresi" })
  ).toBeVisible();
  await popup.getByRole("textbox", { name: "E-posta adresi" }).fill(maill);
  console.log("E-posta adresi girildi.");
  //şifre
  await expect(popup.getByRole("textbox", { name: "Şifre" })).toBeVisible({
    timeout: 10000,
  });
  await popup.getByRole("textbox", { name: "Şifre" }).fill(passwordd);
  console.log("Şifre girildi.");
  //giriş
  await expect(
    popup.getByRole("button", { name: "Giriş yap", exact: true })
  ).toBeVisible({ timeout: 10000 });
  await popup.getByRole("button", { name: "Giriş yap", exact: true }).click();
  console.log("Giriş yap butonuna tıklandı.");
  */
});
