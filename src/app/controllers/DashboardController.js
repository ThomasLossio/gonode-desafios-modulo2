const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }

  async indexProviders (req, res) {
    const { id } = req.session.user
    const appointments = await Appointment.findAll({
      where: {
        provider_id: id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      },
      include: [{ model: User, as: 'user' }],
      order: ['date']
    })

    return res.render('dashboardprovider', { appointments })
    /* return res.json(appointments) */
  }
}

module.exports = new DashboardController()
