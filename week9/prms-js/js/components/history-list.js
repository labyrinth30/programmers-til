import { renderCurrentAsset } from "../components/current-asset";
import { store, removeHistory } from "../store";

const $sectionHistory = document.querySelector(".history");

// 보안을 위한 단순 HTML Escape 함수
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

export function initHistoryList() {
    renderHistoryList();
    addHistoryListEventListener();
}

function addHistoryListEventListener() {
    $sectionHistory.addEventListener("click", function (event) {
        const element = event.target.closest(".delete-button");
        if (!element) return;

        // dataset을 통해 식별자 확보
        const { dateid, itemid } = element.dataset;

        const isSuccess = removeHistory(dateid, itemid);
        if (!isSuccess) {
            alert("소비내역 삭제에 실패했습니다.");
            return;
        }

        reRender();
    });
}

function reRender() {
    // 상태 변경 후 리렌더링
    renderCurrentAsset();
    renderHistoryList();
}

export function renderHistoryList() {
    // map 내부의 복잡한 로직을 분리하여 가독성 확보
    $sectionHistory.innerHTML = store.dateList
        .map(({ date, id: dateId }) => {
            const detail = store.detailList[dateId];
            if (!detail || detail.length === 0) return "";

            // 1. 날짜 헤더 생성 (하드코딩 제거)
            const dateHeader = `<p class="history-date">${escapeHtml(date)}</p>`;

            // 2. 아이템 리스트 생성
            const itemsHtml = detail
                .slice() // 원본 배열 보호를 위한 얕은 복사
                .sort((a, b) => b.id - a.id)
                .map((item) => {
                    const { id: itemId, description, category, amount, fundsAtTheTime, createdAt } = item;

                    const time = new Date(createdAt).toLocaleTimeString("ko-kr", {
                        timeStyle: "short",
                        hourCycle: "h24",
                    });

                    return `
          <section class="history-item">
            <section class="history-item-column">
              <div class="create-at">${time}</div>
              <div class="history-detail">
                <div class="history-detail-row history-detail-title">
                  <p>${escapeHtml(description)}</p>
                </div>
                <div class="history-detail-row history-detail-subtitle">
                  <p>${escapeHtml(category)}</p>
                  <p>
                    ${amount.toLocaleString()} <span>원</span>
                  </p>
                </div>
              </div>
              <div class="delete-section" data-dateId=${dateId} data-itemId=${id}>
                <button class="delete-button" data-dateid="${dateId}" data-itemid="${itemId}">🗑</button>
              </div>
            </section>
            <section class="history-item-caption">
              <p>
                <span>남은 자산</span>
                <span>${fundsAtTheTime.toLocaleString()}</span>
                <span>원</span>
              </p>
            </section>
          </section>`;
                })
                .join("");

            return `<article class="history-per-day">${dateHeader}${itemsHtml}</article>`;
        })
        .join("");
}
