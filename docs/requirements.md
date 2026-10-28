# Requirements — Web đặt cà phê một quán

## What it does

- Khách chọn món, size và topping, rồi thấy giá của món đó trước khi cho vào giỏ.
- Size S giữ giá gốc, size M cộng 5.000đ, size L cộng 10.000đ.
- Topping chọn được nhiều cùng lúc: trân châu cộng 5.000đ, kem cheese cộng 10.000đ.
- Món đang hết hiện nhãn «Hết» và không cho vào giỏ.
- Khách hủy đơn chỉ khi trạng thái còn «Chờ pha»; hủy xong trạng thái thành «Đã hủy».
- Trạng thái đi một chiều: Chờ pha → Đang pha → Sẵn sàng → Đã nhận, và chỉ trang Quầy chuyển được.
- Giỏ và đơn vẫn còn sau khi tải lại trang, vì dữ liệu lưu trong trình duyệt (localStorage), không dùng server.

## Screen

- Trang thực đơn: danh sách món, mỗi món có tên, giá gốc, chỗ chọn size, chỗ chọn topping, và giá tạm tính của món đó.
- Giỏ hàng nằm trên cùng trang thực đơn: từng dòng đã chọn và tổng tiền.
- Chỗ đặt hàng: ô tên người gọi, ô số bàn, và nút đặt.
- Trang trạng thái đơn: mã đơn, danh sách món, tổng tiền, trạng thái, và nút hủy.
- Trang Quầy: danh sách đơn, mỗi đơn có nút chuyển sang trạng thái kế tiếp.
- Mỗi món hiện bằng một emoji và một màu, không dùng ảnh.

## Interactions

- Chọn size hoặc topping thì giá tạm tính của món đổi ngay.
- Bấm thêm một món còn hàng thì món vào giỏ và tổng tiền tăng đúng giá đã chọn.
- Bấm thêm một món có nhãn «Hết» thì không có gì xảy ra.
- Bỏ một dòng khỏi giỏ thì tổng tiền giảm đúng giá của dòng đó.
- Bấm đặt khi giỏ trống, hoặc thiếu tên, hoặc thiếu số bàn thì không tạo đơn.
- Đặt thành công thì mở trang trạng thái; trạng thái bắt đầu là «Chờ pha».
- Bấm hủy khi đơn đang «Chờ pha» thì trạng thái thành «Đã hủy».
- Bấm hủy khi đơn đang «Đang pha», «Sẵn sàng», «Đã nhận» hoặc «Đã hủy» thì không có gì xảy ra.
- Trên trang Quầy, bấm chuyển trạng thái đưa đơn đúng một bước kế tiếp.
- Đơn «Đã nhận» hoặc «Đã hủy» không chuyển tiếp được.
- Khách không đổi được trạng thái sang «Đang pha», «Sẵn sàng» hay «Đã nhận».

## Out of scope

- Không thanh toán.
- Không đăng nhập.
- Không nhiều cửa hàng.
- Không dùng server.
- Không dùng ảnh.
