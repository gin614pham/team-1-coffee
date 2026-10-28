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
