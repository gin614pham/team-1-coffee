# Task list

## 1. Trang thực đơn, giá và giỏ hàng

- What to do: Làm trang thực đơn mở được trên trình duyệt, có món, size, topping, giá tạm tính và giỏ hàng trên cùng trang. Mỗi món hiện bằng emoji và màu, không dùng ảnh. Có món đang hết. Giỏ còn sau khi tải lại trang.
- Done when: Mở trang thấy tên món, giá gốc, emoji và màu, không thấy ảnh. Chọn size M thì giá tạm tính cộng 5.000đ, size L cộng 10.000đ, size S không cộng. Chọn trân châu cộng thêm 5.000đ, kem cheese cộng thêm 10.000đ; chọn cả hai thì cộng cả hai. Bấm thêm món còn hàng thì giỏ có dòng đó và tổng tiền tăng đúng giá vừa tính. Bỏ dòng đó thì tổng giảm đúng số vừa tăng. Bấm thêm món có nhãn «Hết» thì giỏ và tổng không đổi. Tải lại trang thì dòng trong giỏ và tổng tiền vẫn còn.
- Files touched: `index.html`

## 2. Đặt đơn và trang trạng thái

- What to do: Thêm ô tên người gọi, ô số bàn và nút đặt trên trang thực đơn. Đặt hợp lệ thì mở trang trạng thái. Làm sau task 1. Không sửa cách tính giá và giỏ hàng.
- Done when: Giỏ trống, hoặc thiếu tên, hoặc thiếu số bàn, bấm đặt thì vẫn ở trang thực đơn và không thấy đơn mới. Nhập đủ tên và số bàn rồi đặt thì sang trang trạng thái, thấy mã đơn, đúng món đã chọn, đúng tổng tiền, trạng thái «Chờ pha». Trang này không có cách để khách chuyển sang «Đang pha», «Sẵn sàng» hay «Đã nhận». Tải lại trang thì vẫn thấy cùng đơn «Chờ pha».
- Files touched: `index.html`, `order.html`

## 3. Trang Quầy chuyển trạng thái

- What to do: Làm trang Quầy liệt kê đơn và chuyển trạng thái từng bước, chỉ đi tới. Làm sau task 2.
- Done when: Đơn vừa đặt hiện trên trang Quầy ở «Chờ pha». Bấm chuyển một lần thấy «Đang pha», lần hai «Sẵn sàng», lần ba «Đã nhận». Bấm thêm khi đang «Đã nhận» thì vẫn «Đã nhận». Trang trạng thái của khách không đổi trạng thái theo các bước này. Tải lại trang Quầy thì đơn vẫn ở đúng trạng thái vừa chuyển.
- Files touched: `counter.html`

## 4. Hủy đơn chỉ khi còn Chờ pha

- What to do: Thêm nút hủy trên trang trạng thái đúng quy tắc. Làm sau task 2 và task 3. Không sửa cách đặt đơn hay các bước chuyển trạng thái khác.
- Done when: Đơn đang «Chờ pha», bấm hủy thì thấy «Đã hủy». Đơn đã được Quầy chuyển sang «Đang pha», «Sẵn sàng» hoặc «Đã nhận», bấm hủy thì trạng thái không đổi. Đơn «Đã hủy», bấm hủy lần nữa thì vẫn «Đã hủy». Trên trang Quầy, đơn «Đã hủy» bấm chuyển thì không sang bước khác.
- Files touched: `order.html`, `counter.html`

## 5. Giỏ hàng gộp dòng và số lượng

- What to do: Trong giỏ, thêm món thì số lượng là 1. Cùng món, cùng size, cùng tập topping thì cộng vào dòng đã có. Mỗi dòng có ô số lượng, nút tăng, nút giảm và thành tiền. Làm sau task 1. Không đổi giá size, giá topping, cách đặt đơn, hay trang Quầy.
- Done when: Bấm thêm món còn hàng thì dòng đó có số lượng 1 và tổng tiền tăng đúng giá tạm tính. Thêm lần nữa cùng món, cùng size, cùng tập topping thì số lượng thành 2, không thêm dòng mới, tổng tăng đúng đơn giá. Đảo thứ tự topping vẫn ra một dòng. Khác size hoặc khác topping thì thêm dòng mới. Thành tiền một dòng bằng đơn giá nhân số lượng. Bấm tăng thì số lượng cộng 1 và tổng tăng đúng đơn giá. Sửa ô thành một số nguyên từ 1 trở lên thì số lượng và tổng đổi theo số đó. Bấm giảm khi số lượng từ 2 trở lên thì số lượng trừ 1 và tổng giảm đúng đơn giá. Bấm giảm khi số lượng là 1 thì số lượng không đổi và hiện «数量は0より大きくしてください». Sửa ô thành 0, số âm, chữ hoặc để trống thì hiện cùng câu đó và giữ số lượng hợp lệ trước đó. Bỏ một dòng thì mất cả dòng, kể cả khi số lượng lớn hơn 1, và tổng giảm đúng thành tiền dòng đó. Thực đơn vẫn không có ô số lượng. Đặt đơn xong, trang trạng thái hiện số lượng từng món. Tải lại trang thì số lượng và tổng trong giỏ vẫn còn.
- Files touched: `index.html`, `js/menu.js`, `order.html`, `js/order.js`

## 6. Chữ tiếng Nhật trên trang thực đơn

- What to do: Đổi mọi chữ nhìn thấy trên trang thực đơn sang tiếng Nhật, gồm tên món, topping và nhãn hết hàng. Giá vẫn là đồng. Làm sau task 2 và task 5. Không đổi cách tính giá, cách cộng số lượng, hay chữ trạng thái.
- Done when: Trang thực đơn thấy アイスミルクコーヒー, バクシウ, ピーチオレンジレモングラスティー, 抹茶ラテ, ココアフラッペ, アボカドスムージー. Topping hiện タピオカ và チーズクリーム. Món hết hiện «売り切れ»; bấm thêm món đó thì giỏ không đổi. Chọn タピオカ thì giá tạm tính cộng 5.000đ, チーズクリーム cộng 10.000đ. Không còn chữ Việt trên trang thực đơn, kể cả giỏ và chỗ đặt hàng. Giá vẫn là đồng.
- Files touched: `index.html`, `js/menu.js`

## 7. Trạng thái và nút bằng tiếng Nhật

- What to do: Đổi năm trạng thái và chữ trên nút hủy, nút Quầy sang đúng tiếng Nhật. Nút không bấm được thì đổi giao diện. Làm sau task 4 và task 6. Không sửa giá, giỏ, hay số lượng.
- Done when: Đặt đơn xong thì trang trạng thái hiện «調理待ち». Nút hủy ghi «キャンセル» và trông bấm được; bấm thì thành «キャンセル済み», nút vẫn ghi «キャンセル» nhưng trông không bấm được, bấm nữa thì không đổi. Trên Quầy, đơn «調理待ち» có nút «調理を始める»; bấm thì thành «調理中» và nút «受取可能にする»; bấm thì thành «受取可能» và nút «受取済みにする»; bấm thì thành «受取済み», nút ghi «受取済み» và trông không bấm được, bấm thêm thì không đổi. Đơn «調理中», «受取可能» hoặc «受取済み» thì nút hủy vẫn ghi «キャンセル» nhưng trông không bấm được, bấm thì trạng thái không đổi. Đơn «キャンセル済み» trên Quầy có nút «キャンセル済み», trông không bấm được, bấm thì không sang bước khác. Trang trạng thái của khách không có cách chuyển sang «調理中», «受取可能» hay «受取済み». Tải lại thì trạng thái vừa chuyển vẫn còn. Mọi chữ trên trang trạng thái và trang Quầy là tiếng Nhật; giá vẫn là đồng.
- Files touched: `js/menu.js`, `order.html`, `js/order.js`, `counter.html`, `js/counter.js`, `css/styles.css`
