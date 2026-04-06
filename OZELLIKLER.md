# Özellikler

## Kimlik Doğrulama ve Hesap Yönetimi

- Kullanıcı kayıt olabilir
- Kullanıcı giriş yapabilir
- Kullanıcı oturumunu kapatabilir
- Kullanıcı hesap bilgilerini görüntüleyebilir
- Kullanıcı şifresini değiştirebilir
- Kullanıcı hesabını tamamen silebilir

## Dashboard

- Günlük özet kartları görüntülenebilir
- Günlük alınan kalori bilgisi görülebilir
- Günlük yakılan kalori bilgisi görülebilir
- Günlük net kalori bilgisi görülebilir
- Günlük makro değerleri takip edilebilir
- Günlük öğün listesi görüntülenebilir
- Günlük egzersiz listesi görüntülenebilir
- Blog kartları dashboard üzerinden görülebilir
- Takvim seçimi ile gün bazlı filtreleme yapılabilir
- Kullanıcı hesap menüsüne dashboard üzerinden erişebilir

## Öğün Yönetimi

- Kullanıcı yemek arayabilir
- Kullanıcı öğün seçebilir
- Porsiyona göre kalori hesaplaması yapılabilir
- Porsiyona göre protein, karbonhidrat ve yağ hesaplanabilir
- Öğün türü seçilebilir
- Günlük öğün kaydı oluşturulabilir
- Seçilen tarihe göre öğün geçmişi görüntülenebilir
- Öğün kayıtları silinebilir

## Egzersiz Yönetimi

- Kullanıcı egzersiz arayabilir
- Kullanıcı aktivite seçebilir
- Süreye göre kalori hesaplaması yapılabilir
- Günlük egzersiz kaydı oluşturulabilir
- Seçilen tarihe göre egzersiz geçmişi görüntülenebilir
- Egzersiz kayıtları silinebilir
- Dış API’den gelen ham veriler normalize edilerek kullanıcıya daha sade aktivite isimleri gösterilir

## Takvim ve Gün Bazlı Takip

- Kullanıcı takvim üzerinden gün seçebilir
- Seçilen güne göre öğün kayıtları listelenebilir
- Seçilen güne göre egzersiz kayıtları listelenebilir
- Geçmiş gün kayıtları incelenebilir
- Dashboard ve detay sayfaları aynı tarih mantığı ile çalışır

## Su Takibi

- Kullanıcı günlük su miktarını takip edebilir
- Bardak bazlı ilerleme görüntülenebilir
- Günlük litre hedefi takip edilebilir

## Blog

- Blog listeleme sayfası bulunmaktadır
- Blog detay sayfası bulunmaktadır
- İçerik tarafı uygulama içinde ayrı bir alan olarak sunulmuştur

## Arayüz ve Deneyim

- Masaüstü görünüm desteklenir
- Tablet görünüm desteklenir
- Mobil görünüm desteklenir
- Drawer yapıları meal ve exercise tarafında tutarlı şekilde çalışır
- Kullanıcı deneyimi sade ve okunabilir olacak şekilde tasarlanmıştır

## Teknik Özellikler

- Frontend tarafında React.js kullanılmıştır
- Ana tasarım sistemi plain CSS ile kurulmuştur
- Bootstrap ve Tailwind ile ayrıca demo sayfalar da oluşturulmuştur
- Backend tarafında Node.js ve Express.js kullanılmıştır
- Katmanlı yapı olarak route, controller, service ve repository ayrımı yapılmıştır
- Veritabanı tarafında MSSQL kullanılmıştır
- Besin verileri veritabanı destekli yapı ile tutulmaktadır
- Egzersiz tarafında dış API entegrasyonu ve normalization mantığı kullanılmıştır
- Demo kullanıcı ile sunum ve test akışı desteklenmektedir
