document.addEventListener('DOMContentLoaded', () => {
	const list = document.querySelector('#todoList')
	const input = document.querySelector('#todoInput')
	const search = document.querySelector('#searchInput')
	const status = document.querySelector('#status')

	const countAll = document.querySelector('#countAll')
	const countDone = document.querySelector('#countDone')

	function updateCounters() {
		const items = Array.from(list.querySelectorAll('.item')).filter(isVisible)
		const done = items.filter(li => li.classList.contains('done'))
		countAll.textContent = String(items.length)
		countDone.textContent = String(done.length)
	}

	function isVisible(el) {
		return !(el.style.display === 'none')
	}

	function escapeHTML(str) {
		const div = document.createElement('div')
		div.textContent = str
		return div.innerHTML
	}

	function addItem(text) {
		const safe = escapeHTML(text)
		const li = document.createElement('li')
		li.className = 'item'
		li.dataset.text = text.toLowerCase()

		li.innerHTML = `
		<div class="item__left">
			<input type="checkbox" class="js-check" />
			<span class="js-text">${safe}</span>
			<span class="badge">new</span>
		</div>
		<button class="btn btn--ghost js-del" type="button">Удалить</button>
		`

		li.style.display = 'none'
		list.appendChild(li)
		li.style.display = ''
		updateCounters()
	}

	document.querySelector('#todoForm').addEventListener('submit', e => {
		e.preventDefault()
		const text = input.value.trim()
		if (!text) return
		addItem(text)
		input.value = ''
		input.focus()
	})

	list.addEventListener('click', e => {
		const delBtn = e.target.closest('.js-del')
		if (!delBtn) return

		const item = delBtn.closest('.item')
		if (!item) return

		item.remove()
		updateCounters()
	})

	list.addEventListener('change', e => {
		const check = e.target.closest('.js-check')
		if (!check) return

		const item = check.closest('.item')
		item.classList.toggle('done')
		updateCounters()
	})

	search.addEventListener('input', () => {
		const q = search.value.trim().toLowerCase()
		list.querySelectorAll('.item').forEach(li => {
			li.style.display = li.dataset.text.includes(q) ? '' : 'none'
		})
		updateCounters()
	})

	document.querySelector('#btnClear').addEventListener('click', () => {
		list.innerHTML = ''
		updateCounters()
	})

	document.querySelector('#btnToggleTheme').addEventListener('click', () => {
		document.body.classList.toggle('light')
	})

	const modal = document.querySelector('#modal')
	document.querySelector('#btnHelp').addEventListener('click', () => {
		modal.style.display = 'block'
	})
	document.querySelector('#btnCloseModal').addEventListener('click', () => {
		modal.style.display = 'none'
	})
	modal.addEventListener('click', e => {
		if (e.target === modal) modal.style.display = 'none'
	})

	document.querySelector('#btnLoad').addEventListener('click', async e => {
		status.textContent = 'Loading...'
		const btn = e.currentTarget
		btn.disabled = true

		await new Promise(r => setTimeout(r, 600))
		;['Сделать диплом', 'Купить йогурт', 'Проверить Nginx конфиг'].forEach(
			addItem
		)

		status.textContent = 'Successful!'
		btn.disabled = false

		updateCounters()
	})
})
