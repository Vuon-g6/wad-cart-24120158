# Self-assessment — IA#1

Submitted by: 24120158 — Phan Tấn Vượng  
Total I claim: **95 / 100**

| Criterion | Max | I claim | Evidence |
|---|---|---|---|
| **Behaviour** | 30 | **29** | `npm test` 15/15 xanh trên máy. `test/cart.test.js` kiểm thử toàn diện: ví dụ mẫu từ slide (467400), kiểm tra kiểu trả về (number), giỏ hàng rỗng (không VAT, không phí ship), logic ngưỡng phí ship (đúng ngưỡng, thấp hơn 1 đồng, cao hơn), ném lỗi `RangeError` khi giá trị âm, số lượng bằng 0 hoặc phân số. `src/cart.js` áp dụng `Math.round` duy nhất ở bước cuối cùng, tuyệt đối không dùng `toFixed`. Trừ 1 điểm vì một số hành vi ngoại biên (như giá trị mặc định của `options`, ngoại lệ `RangeError` cho `vatRate`/`shipFee`) là quyết định thiết kế từ trợ lý trong quá trình hiện thực hóa đặc tả. |
| **Tests** | 20 | **19** | 15 unit test độc lập trong `test/cart.test.js`, đặt tên theo từng quy tắc cụ thể (kiểu dữ liệu, giỏ rỗng, biên của ngưỡng ship, tính hợp lệ của `price` và `qty`, các trường hợp làm tròn). Các test tuân thủ nguyên tắc kiểm tra đầu vào -> đầu ra, không can thiệp vào logic nội bộ của hàm. Trừ 1 điểm vì chưa viết test riêng cho trường hợp `vatRate`/`shipFee` truyền vào không hợp lệ hoặc `items` không phải là mảng (dù code nguồn có cơ chế phòng thủ). |
| **Harness** | 20 | **19** | Bộ khung vận hành hoàn chỉnh: `CLAUDE.md` định nghĩa rõ công nghệ, quy tắc và danh sách "Never" (cấm `toFixed`, cấm dependency); các gate tự động kiểm tra cú pháp, khoảng trắng (`npm run lint`, `npm run format:check`); GitHub Actions workflow (`.github/workflows/ci.yml`) tự động kích hoạt khi push code. CI đã chạy xanh trên GitHub ở commit mới nhất. Trừ 1 điểm nhỏ vì các gate kiểm tra được viết bằng script tùy chỉnh thay vì linter/formatter chuyên dụng (như ESLint/Prettier) do giới hạn không dùng dependency ngoài. |
| **Brief** | 15 | **14** | `brief.md` định nghĩa rõ phạm vi file được/không được sửa, contract kỹ thuật cốt lõi (subtotal, VAT, vị trí so sánh ngưỡng trước VAT, quy tắc làm tròn một lần), danh mục các trường hợp lỗi, cam kết "no dependencies", kèm ví dụ tham chiếu 467400 và tiêu chí nghiệm thu rõ ràng ("How I will know it worked"). Trừ 1 điểm vì đây là sản phẩm đồng kiến tạo với trợ lý và chưa qua bước thực nghiệm bàn giao cho một phiên làm việc độc lập hoàn toàn khác để kiểm chứng tính minh bạch tuyệt đối. |
| **AI-LOG.md** | 15 | **14** | `AI-LOG.md` cấu trúc mạch lạc: Phần 1 theo 5 bước logic, Phần 2 ghi lại chi tiết 15 lượt tương tác (prompt), chỉ rõ công cụ sử dụng, phần do trợ lý đề xuất, phần cấu hình môi trường xử lý thủ công (CRLF sang LF, `.gitattributes`), phần kiểm tra và đối soát trực tiếp qua `git log`. Trừ 1 điểm vì phần thao tác thủ công (By hand) chủ yếu xoay quanh việc quản lý môi trường, chạy lệnh, kiểm tra diff và cấu hình Git thay vì tự viết thuần túy từng dòng code từ đầu. |
| **Total** | **100** | **95** | Tổng cộng: 29 + 19 + 19 + 14 + 14 = 95 |

## What I did not manage

- Một số cấu phần kiến trúc và code nền tảng ban đầu được hỗ trợ khởi tạo thông qua trợ lý AI, đòi hỏi tôi phải tập trung cao độ vào việc đọc hiểu sâu, kiểm thử, xử lý khác biệt hệ điều hành (CRLF/LF) và chịu trách nhiệm giải trình toàn bộ mã nguồn.
- Các script lint và format tự viết tập trung vào quy ước định dạng nội bộ, không thay thế hoàn toàn được các bộ quy tắc linting chuẩn công nghiệp do ràng buộc không sử dụng dependency ngoài.
- Chưa bao phủ đầy đủ các trường hợp ngoại lệ cực đoan của số chấm động (floating-point precision) tại ranh giới đúng nửa đồng (ví dụ: `.5`), hoặc các kiểm tra đầu vào sai lệch kiểu dữ liệu (`vatRate`, `items`).

## What I would do differently

- Chủ động phác thảo trước khung cấu trúc validation và unit test cơ bản bằng tay ở bản nháp cá nhân trước khi đối chiếu với mã nguồn do trợ lý đề xuất, giúp tăng tỷ trọng tự chủ (`By hand`) trong nhật ký hoạt động.
- Thử nghiệm quy trình "mù" bằng cách đưa `brief.md` và các test case cho một phiên trợ lý hoàn toàn tách biệt để đo lường mức độ rõ ràng và tính tái lập của tài liệu kỹ thuật.
- Thiết lập đồng bộ quy chuẩn xuống dòng (`.gitattributes` với `* text=auto eol=lf`) ngay từ thời điểm khởi tạo kho lưu trữ để tối ưu hóa trải nghiệm làm việc trên nền tảng Windows.