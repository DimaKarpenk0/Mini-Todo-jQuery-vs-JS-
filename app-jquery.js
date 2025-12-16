$(function () {
	const $list = $('#todoList')
	const $input = $('#todoInput')
	const $search = $('#searchInput')
	const $status = $('#status')

	function updateCounter() {
		const all = $list.children('.item:visible').length
		const done = $list.children('.item.done:visible').length
		$('#countAll').text(all)
		$('#countDone').text(done)
	}

	function addItem(text) {
		const safe = $('<div>').text(text).html()
		const $li = $(`
			<li class="item" data-text="${safe.toLowerCase()}">
			<div class="item__left">
				<input type="checkbox" class="js-check" />
				<span class="js-text">${safe}</span>
				<span class="badge">new</span>
			</div>
			<button class="btn btn--ghost js-del" type="button">Удалить</button>
			</li>
		`)

		$li.hide().appendTo($list).slideDown(120)
		updateCounter()
	}

	$('#todoForm').on('submit', function (e) {
		e.preventDefault()
		const text = $input.val().trim()
		if (!text) return

		addItem(text)
		$input.val('').focus()
	})

	$list.on('click', '.js-del', function () {
		$(this)
			.closest('.item')
			.slideUp(120, function () {
				$(this).remove()
				updateCounter()
			})
	})

	$list.on('change', '.js-check', function () {
		$(this).closest('.item').toggleClass('done')
		updateCounter()
	})

	$search.on('input', function () {
		const q = $(this).val().trim().toLowerCase()
		$list.children('.item').each(function () {
			const text = $(this).attr('data-text')
			$(this).toggle(text.includes(q))
		})
		updateCounter()
	})

	$('#btnClear').on('click', function () {
		$list.children('.item').fadeOut(120, function () {
			$(this).remove()
			updateCounter()
		})
	})

	$('#btnToggleTheme').on('click', function () {
		$('body').toggleClass('light')
	})

	$('#btnHelp').on('click', function () {
		$('#modal').fadeIn(120)
	})
	$('#btnCloseModal').on('click', function () {
		$('#modal').fadeOut(120)
	})
	$('#modal').on('click', function (e) {
		if (e.target === this) $(this).fadeOut(120)
	})

	$('#btnLoad').on('click', async function () {
		$status.text('Loading...')
		$(this).prop('disabled', true)

		await new Promise(r => setTimeout(r, 600))
		;['Сделать диплом', 'Купить йогурт', 'Проверить Nginx конфиг'].forEach(
			addItem
		)

		$status.text('Successful!')
		$(this).prop('disabled', false)
	})

	updateCounter()
})
