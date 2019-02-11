const { User, Appointment } = require('../models')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }

  async indexProviders (req, res) {
    const { id } = req.session.user
    const appointments = await Appointment.findAll({
      where: { provider_id: id },
      include: [{ all: true }],
      order: ['date']
    })

    return res.render('dashboardprovider', { appointments })
    /* return res.json(appointments) */
  }
}

module.exports = new DashboardController()
