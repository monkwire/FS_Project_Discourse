class Api::ServersController < ApplicationController

    def index
        @servers = Server.all
        render 'api/servers/index'
    end

    def show
        @server = Server.find(params[:id])
        render 'api/servers/show'
    end

    def create
        @server = Server.new(server_name: server_paramsm, owner_id: current_user.id)

        if @server.save!
            render 'api/servers/show'
        else
            render json: { errors: @server.errors.full_messages }
        end
    end

    private

    def server_params
        params.require(:server).permit(:server_name)
    end
end