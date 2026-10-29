# Requirements — Web đặt cà phê một quán

## What it does

- Khách chọn món, size và topping, rồi thấy giá của món đó trước khi cho vào giỏ.
- Size S giữ giá gốc, size M cộng 5.000đ, size L cộng 10.000đ.
- Topping chọn được nhiều cùng lúc: タピオカ cộng 5.000đ, チーズクリーム cộng 10.000đ.
- Món đang hết hiện nhãn «売り切れ» và không cho vào giỏ.
- Mọi chữ nhìn thấy trên ba trang là tiếng Nhật; giá vẫn là đồng. Trạng thái đúng năm chữ: 調理待ち, 調理中, 受取可能, 受取済み, キャンセル済み.
- Thêm từ thực đơn thì số lượng là 1. Cùng món, cùng size, cùng tập topping thì cộng 1 vào dòng đã có. Thành tiền một dòng bằng đơn giá nhân số lượng.
- Hủy chỉ khi «調理待ち», xong thành «キャンセル済み». Trạng thái chỉ đi tới trên trang Quầy: 調理待ち → 調理中 → 受取可能 → 受取済み. Giỏ và đơn còn sau khi tải lại, lưu trong trình duyệt, không dùng server.

## Screen

- Trang thực đơn: danh sách món, mỗi món có tên, giá gốc, chỗ chọn size, chỗ chọn topping, và giá tạm tính. Thực đơn không có ô số lượng.
- Tên món: アイスミルクコーヒー, バクシウ, ピーチオレンジレモングラスティー, 抹茶ラテ, ココアフラッペ, アボカドスムージー.
- Giỏ hàng nằm trên cùng trang thực đơn. Mỗi dòng đã chọn hiện tên, size, topping, ô số lượng, nút tăng, nút giảm, và thành tiền. Phía dưới là tổng tiền.
- Chỗ đặt hàng: ô tên người gọi, ô số bàn, và nút đặt.
- Trang trạng thái đơn: mã đơn, danh sách món kèm số lượng, tổng tiền, trạng thái, và nút hủy.
- Khi trạng thái là «調理待ち», nút hủy ghi «キャンセル» và trông bấm được.
- Khi trạng thái là «調理中», «受取可能», «受取済み» hoặc «キャンセル済み», nút hủy vẫn ghi «キャンセル» nhưng đổi giao diện để thấy là không bấm được.
- Trang Quầy: danh sách đơn. Nút chuyển trạng thái đổi chữ theo trạng thái hiện tại.
- Đơn «調理待ち»: nút ghi «調理を始める».
- Đơn «調理中»: nút ghi «受取可能にする».
- Đơn «受取可能»: nút ghi «受取済みにする».
- Đơn «受取済み»: nút ghi «受取済み» và đổi giao diện để thấy là không bấm được.
- Đơn «キャンセル済み»: nút ghi «キャンセル済み» và đổi giao diện để thấy là không bấm được.
- Mỗi món hiện bằng một emoji và một màu, không dùng ảnh.

## Interactions

- Chọn size hoặc topping thì giá tạm tính của món đổi ngay.
- Bấm thêm một món còn hàng thì món vào giỏ với số lượng 1. Nếu giỏ đã có dòng cùng món, cùng size, cùng tập topping (thứ tự topping không đổi kết quả) thì số lượng dòng đó cộng 1, không tạo dòng mới. Tổng tiền tăng đúng đơn giá.
- Bấm thêm một món có nhãn «売り切れ» thì không có gì xảy ra.
- Trong giỏ, bấm tăng thì số lượng cộng 1 và tổng tiền tăng đúng đơn giá.
- Trong giỏ, sửa ô số lượng thành một số nguyên từ 1 trở lên thì số lượng đổi thành số đó và tổng tiền tính lại.
- Trong giỏ, bấm giảm khi số lượng từ 2 trở lên thì số lượng trừ 1 và tổng tiền giảm đúng đơn giá.
- Trong giỏ, bấm giảm khi số lượng là 1 thì số lượng không đổi và hiện «数量は0より大きくしてください».
- Trong giỏ, sửa ô số lượng thành 0, số âm, chữ hoặc để trống thì hiện «数量は0より大きくしてください» và giữ số lượng hợp lệ trước đó.
- Bỏ một dòng khỏi giỏ thì xóa cả dòng, kể cả khi số lượng lớn hơn 1, và tổng tiền giảm đúng thành tiền của dòng đó.
- Bấm đặt khi giỏ trống, hoặc thiếu tên, hoặc thiếu số bàn thì không tạo đơn.
- Đặt thành công thì mở trang trạng thái; trạng thái bắt đầu là «調理待ち».
- Bấm hủy khi đơn đang «調理待ち» thì trạng thái thành «キャンセル済み».
- Bấm hủy khi nút đang ở giao diện không bấm được thì không có gì xảy ra.
- Trên trang Quầy, bấm nút khi đơn còn chuyển được thì đưa đơn đúng một bước kế tiếp và chữ trên nút đổi theo trạng thái mới.
- Đơn «受取済み» hoặc «キャンセル済み» không chuyển tiếp được; bấm nút không có gì xảy ra.
- Khách không đổi được trạng thái sang «調理中», «受取可能» hay «受取済み».

## Out of scope

- Không thanh toán.
- Không đăng nhập.
- Không nhiều cửa hàng.
- Không dùng server.
- Không dùng ảnh.
- Không nút đổi ngôn ngữ.
- Không đổi đơn vị tiền sang yên.
- Không ô số lượng trên thực đơn.
- Không giới hạn số lượng tối đa, không kiểm tra tồn kho.
- Không sửa đơn đã lưu trong trình duyệt từ trước khi đổi sang tiếng Nhật.
