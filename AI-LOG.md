# AI-LOG.md — IA#1 cartTotal

## Lịch sử tương tác và phát triển dự án (Chronological AI Log)

File này ghi lại toàn bộ quá trình thực hiện bài tập IA#1 thông qua các phiên làm việc và câu lệnh (prompt) theo đúng thứ tự thời gian thực tế, thể hiện rõ quá trình bóc tách yêu cầu, dựng harness, xử lý lỗi hệ thống (như khác biệt CRLF/LF trên Windows), đối soát mã nguồn và kiểm thử.

---

### Lượt 1: Giao đề bài tổng quan
* **Tool:** Claude
* **Yêu cầu của tôi:** Cung cấp rubric, slide buổi 2, template báo cáo tự chấm và template AI-LOG; hướng dẫn làm toàn bộ bài IA#1 và đưa ra một gói mã nguồn mẫu.
* **Phần giữ lại từ trợ lý:** Cấu trúc dự án mẫu hoàn chỉnh gồm các file config, test, code nguồn và báo cáo nháp với tổng điểm 87.
* **Phần thay đổi / Tự làm:** Không lấy nguyên gói code mà quyết định tự thiết lập lại từng bước trên kho lưu trữ cá nhân để kiểm soát hoàn toàn mã nguồn và hiểu rõ từng dòng logic.
* **Trạng thái / Kết quả:** Nhận diện được cấu trúc mục tiêu và lập lộ trình tự làm từng bước.

### Lượt 2: Xin khung quy trình từng bước chuẩn 100 điểm
* **Tool:** Claude
* **Yêu cầu của tôi:** "Chỉ tôi từng bước làm từ đầu để đạt điểm tối ưu."
* **Phần giữ lại từ trợ lý:** Khung 6 bước thực hiện (Chuẩn bị môi trường, Dựng Harness, Viết Brief, Vòng lặp Test-Code-Gate, Viết AI-LOG, Tự chấm và đóng gói).
* **Phần thay đổi / Tự làm:** Thiết lập kho lưu trữ GitHub riêng (`Vuon-g6/wad-cart-24120158`), kết nối remote và khởi tạo git trên máy.
* **Trạng thái / Kết quả:** Có sẵn một checklist từng bước rõ ràng để bắt tay vào code.

### Lượt 3: Lựa chọn môi trường phát triển
* **Tool:** Claude
* **Yêu cầu của tôi:** Hỏi kinh nghiệm nên dùng VS Code cục bộ trên máy hay GitHub Codespaces.
* **Phần giữ lại từ trợ lý:** Lời khuyên ưu tiên sử dụng VS Code cục bộ vì phù hợp với yêu cầu bài toán, dễ kiểm soát môi trường Node.js/npm và không tốn hạn mức cloud.
* **Phần thay đổi / Tự làm:** Kiểm tra trực tiếp trên máy cá nhân bằng lệnh `node -v`, `npm -v` và `git --version`.
* **Trạng thái / Kết quả:** Xác định dùng VS Code cục bộ.

### Lượt 4: Soạn thảo file quy tắc `CLAUDE.md`
* **Tool:** Claude
* **Yêu cầu của tôi:** Xin nội dung file `CLAUDE.md` (ban đầu bằng tiếng Anh, sau đó yêu cầu dịch sang tiếng Việt).
* **Phần giữ lại từ trợ lý:** Nội dung file `CLAUDE.md` định nghĩa tech stack, 3 lệnh cốt lõi, quy chuẩn code style và danh sách các điều khoản "Never" (tuyệt đối cấm dùng `toFixed` và cấm thêm dependency ngoài).
* **Phần thay đổi / Tự làm:** Lưu file vào thư mục gốc của repo, đọc kỹ từng điều khoản để nắm chắc giới hạn kỹ thuật.
* **Trạng thái / Kết quả:** Đã có file `CLAUDE.md` chuẩn chỉnh bằng tiếng Việt.

### Lượt 5: Thiết lập bộ khung kiểm tra tự động (Harness & Gates)
* **Tool:** Claude
* **Yêu cầu của tôi:** Hỏi về file `package.json` và cách tạo các gate kiểm tra ngoài `npm test`.
* **Phần giữ lại từ trợ lý:** Cấu hình 2 script mới trong `package.json` (`lint` và `format:check`), kèm theo mã nguồn cho hai file tự viết `scripts/lint.js` và `scripts/format-check.js`.
* **Phần thay đổi / Tự làm:** Tạo thư mục `scripts/`, tạo hai file script, bổ sung cấu hình và chạy thử nghiệm.
* **Trạng thái / Kết quả:** Chạy `npm run lint` và `npm run format:check` lần đầu nhưng gặp lỗi dòng mới do sự khác biệt giữa Windows và Linux (CRLF vs LF).

### Lượt 6: Xử lý sự cố định dạng dòng (CRLF/LF on Windows)
* **Tool:** Claude
* **Yêu cầu của tôi:** "Báo lỗi CRLF line endings khi chạy `npm run format:check` dù tôi đã đổi sang LF ở góc VS Code."
* **Phần giữ lại từ trợ lý:** Giải thích nguyên nhân do Git trên Windows tự động checkout file dạng CRLF và nút đổi ở góc VS Code chỉ tác động file đang mở. Hướng dẫn giải pháp triệt để: Chạy lệnh Node.js chuyển đổi hàng loạt, cấu hình `git config core.autocrlf false`, thiết lập file `.gitattributes` (`* text=auto eol=lf`) và chỉnh `files.eol` trong VS Code.
* **Phần thay đổi / Tự làm:** Thực thi toàn bộ lệnh sửa lỗi trên dòng lệnh, kiểm tra lại cho đến khi `npm run format:check` báo thông qua thành công (`ok`).
* **Trạng thái / Kết quả:** Lỗi định dạng dòng được triệt tiêu hoàn toàn.

### Lượt 7: Soạn thảo và đồng bộ tài liệu yêu cầu (`brief.md`)
* **Tool:** Claude
* **Yêu cầu của tôi:** Hướng dẫn các bước tiếp theo sau khi có file `brief.md` và xử lý cảnh báo Git khi thêm file.
* **Phần giữ lại từ trợ lý:** Nội dung `brief.md` quy định rõ phạm vi file được/không được sửa, contract kỹ thuật (subtotal, VAT, vị trí so sánh ngưỡng freeship trước VAT, quy tắc làm tròn một lần bằng `Math.round`), các trường hợp ngoại lệ và tiêu chí nghiệm thu. Cảnh báo Git về việc chuyển đổi CRLF khi `git add`.
* **Phần thay đổi / Tự làm:** Đọc hiểu chi tiết từng điều khoản trong brief, thực hiện `git add brief.md`, commit và push lên GitHub, sau đó kiểm tra tab GitHub Actions thấy trạng thái build/test đang đỏ (do chưa có code cài đặt).
* **Trạng thái / Kết quả:** Brief được ban hành chính thức trong repo và CI chạy kiểm chứng đúng trạng thái đỏ ban đầu.

### Lượt 8: Tái cấu trúc kho lưu trữ (Clone lại từ đầu)
* **Tool:** Claude
* **Yêu cầu của tôi:** "Tôi vừa xóa repo làm lại từ đầu để dọn sạch lịch sử, hướng dẫn tôi cấu hình lại từ bước đầu nhanh chóng."
* **Phần giữ lại từ trợ lý:** Quy trình 4 bước tái thiết lập: tắt autocrlf ngay khi clone, tạo `.gitattributes` từ sớm, đưa file harness vào và kiểm tra `format:check`.
* **Phần thay đổi / Tự làm:** Thực hiện xóa thư mục cũ, clone lại repo sạch sẽ trên máy, áp dụng ngay các cấu hình chống lỗi CRLF từ trước khi commit bất kỳ file code nào.
* **Trạng thái / Kết quả:** Môi trường làm việc sạch sẽ, chuẩn chỉnh và không còn lỗi phát sinh về dòng mới.

### Lượt 9: Đưa bộ test mẫu vào và thiết lập quy trình TDD (Test-Driven Development)
* **Tool:** Claude
* **Yêu cầu của tôi:** Hỏi cách đưa các file test vào repo và thực hiện commit theo đúng trình tự TDD (test đỏ trước, cài đặt sau).
* **Phần giữ lại từ trợ lý:** Phương án chép file `test/cart.test.js` gồm 15 unit test theo đặc tả (kiểm tra ví dụ mẫu 467400, kiểu dữ liệu, giỏ rỗng, các biên giới hạn của ngưỡng freeship, xử lý ngoại lệ số âm và phân số) rồi tiến hành commit ở trạng thái đỏ.
* **Phần thay đổi / Tự làm:** Chép file test vào thư mục `test/`, chạy `npm test` xác nhận toàn bộ 15 test đều thất bại (red), thực hiện `git add test/cart.test.js` và commit đánh dấu mốc test đỏ.
* **Trạng thái / Kết quả:** Hoàn tất bước viết test trước khi có mã nguồn (`tests: 15 unit tests added, failing as expected`).

### Lượt 10: Xử lý thao tác lệnh Git Diff trên terminal
* **Tool:** Claude
* **Yêu cầu của tôi:** (Dán output màn hình `less` do chạy `git diff` trên terminal và bị kẹt không thoát ra được).
* **Phần giữ lại từ trợ lý:** Hướng dẫn nhấn phím `q` để thoát khỏi chế độ `less`, đồng thời gợi ý sử dụng lệnh `git --no-pager diff` cho các lần kiểm tra sau để tránh bị kẹt màn hình phụ.
* **Phần thay đổi / Tự làm:** Thực hiện nhấn `q`, sau đó dùng lệnh `git --no-pager diff` để xem lại toàn bộ nội dung khác biệt hiển thị trực tiếp ra màn hình dòng lệnh một cách mượt mà, không bị ngắt quãng.
* **Trạng thái / Kết quả:** Làm chủ thao tác dòng lệnh Git thuận lợi.

### Lượt 11: Thêm mã nguồn (`src/cart.js`) và kiểm tra toàn bộ Gates
* **Tool:** Claude
* **Yêu cầu của tôi:** Xin nội dung file `src/cart.js` để làm cho toàn bộ 15 test chuyển xanh, đồng thời không vi phạm quy tắc cấm dependency và cấm `toFixed`.
* **Phần giữ lại từ trợ lý:** Toàn bộ logic trong `src/cart.js`: hàm kiểm tra số nguyên/dương hợp lệ, xử lý options mặc định (`vatRate: 0`, `shipFee: 0`, `freeShipFrom: Infinity`), kiểm tra mảng rỗng trả về 0, tính subtotal bằng `reduce`, xác định phí ship dựa trên ngưỡng trước VAT, và áp dụng duy nhất một lần `Math.round` ở bước tính tổng cuối cùng.
* **Phần thay đổi / Tự làm:** Đưa code vào `src/cart.js`, chạy lệnh kiểm tra `git --no-pager diff` để rà soát kỹ lưỡng (xác nhận không có thư viện lạ, không có `toFixed`, không có khối `catch {}` ép kiểu bậy bạ). Chạy lần lượt `npm test` (đạt 15/15 xanh), `npm run lint` (ok) và `npm run format:check` (ok). Tiến hành commit `cartTotal: implementation, all gates green` và push lên GitHub, xác nhận hệ thống GitHub Actions CI bên phía máy chủ đã build và test thành công (tích xanh).
* **Trạng thái / Kết quả:** Toàn bộ hệ thống kiểm tra tự động (cả cục bộ lẫn GitHub Actions trên mây) đều đạt trạng thái xanh tuyệt đối (`Passing`).

---

## Tóm tắt giới hạn kỹ thuật được ghi nhận:
1. **Linter tùy chỉnh:** Do quy định "no dependencies", hai script `lint.js` và `format-check.js` tự viết chỉ tập trung kiểm tra cú pháp cơ bản và quy chuẩn khoảng trắng/dòng mới, không thể thay thế hoàn toàn các công cụ phân tích tĩnh chuyên sâu như ESLint hay Prettier.
2. **Độ chính xác dấu phẩy động (Floating-point):** Các trường hợp biên chứa giá trị đúng nửa đồng (ví dụ `.5`) có thể bị ảnh hưởng nhỏ bởi cách biểu diễn số thực trong JavaScript trước khi đi qua `Math.round`. Đặc tả đề bài không yêu cầu xử lý sâu trường hợp này và hiện tại chưa có test case tương ứng.